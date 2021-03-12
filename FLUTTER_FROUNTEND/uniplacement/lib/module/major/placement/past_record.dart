import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:uniplacement/module/add_on/drawer/drawer.dart';
// import 'package:uniplacement/module/drawer/drawer.dart';
// import 'package:uniplacement/widgets/drawer.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';

// ignore: must_be_immutable
class PastPage extends StatelessWidget {
  static const String routeName = '/pastrecord';
  Future<List<Record>> records;
  final String url = 'https://api.plax.tech/placement/past';
  @override
  Widget build(BuildContext context) {
    records = parseRecords();
    return new Scaffold(
        appBar: AppBar(
          title: Text("On Campus / Past Records"),
        ),
        drawer: AppDrawer(),
        body: Center(
            child: FutureBuilder<List<Record>>(
          future: records,
          builder: (context, snapshot) {
            if (snapshot.hasError) print(snapshot.error);
            return snapshot.hasData
                ? PlacementList(records: snapshot.data)
                : Center(child: CircularProgressIndicator());
          },
        )));
  }

  Future<List<Record>> parseRecords() async {
    final response = await http.get(url);
    final responseBody = response.body;
    final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();

    return parsed.map<Record>((json) => Record.fromJson(json)).toList();
  }
}

class Record {
  final String id, title, company, location, url;
  final int avg_salary, hig_salary, year, candidates_hired;

  Record({
    this.id,
    this.title,
    this.company,
    // ignore: non_constant_identifier_names
    this.hig_salary,
    // ignore: non_constant_identifier_names
    this.avg_salary,
    // ignore: non_constant_identifier_names
    this.candidates_hired,
    this.year,
    this.location,
    this.url,
  });

  factory Record.fromJson(Map json) {
    return Record(
        id: json['_id'],
        title: json['designation'],
        company: json['company_name'],
        avg_salary: json['average_package'],
        hig_salary: json['highest_package'],
        candidates_hired: json['candidates_hired'],
        location: json['location'],
        year: json['year'],
        url: json['website']);
  }
}

class PlacementList extends StatelessWidget {
  final List<Record> records;

  PlacementList({Key key, this.records});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: records.length,
      itemBuilder: (context, index) {
        return Container(
          margin: EdgeInsets.all(8.0),
          child: Card(
            elevation: 7,
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(8.0))),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                ListTile(
                  title: Text(records[index].company),
                  subtitle: Text(
                      records[index].title + " " + records[index].location),
                  leading: Icon(Icons.location_city),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                    SizedBox(
                      width: 70,
                    ),
                    Text("Year : " +
                        records[index].year.toString() +
                        "\n" +
                        "No Of Candidates hired : " +
                        records[index].candidates_hired.toString()),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: <Widget>[
                    TextButton(
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                      DetailedRecord(records: records[index])));
                        },
                        child: Text('Know More')),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

// ignore: must_be_immutable
class DetailedRecord extends StatelessWidget {
  final Record records;
  int i = 0;
  DetailedRecord({this.records});
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: AppBar(
        title: Text(records.company),
      ),
      drawer: AppDrawer(),
      body: Padding(
        padding: const EdgeInsets.all(10),
        child: Expanded(
          child: Table(
            border: TableBorder.symmetric(
                inside: BorderSide(width: 1), outside: BorderSide(width: 1)),
            defaultVerticalAlignment: TableCellVerticalAlignment.middle,
            children: <TableRow>[
              makeRow('Company Name', records.company, i++),
              makeRow("Designation", records.title, i++),
              makeRow("Location", records.location, i++),
              makeRow("Average Package", records.avg_salary.toString(), i++),
              makeRow("Highest Package", records.hig_salary.toString(), i++),
              makeRow("Number of Candidates hired",
                  records.candidates_hired.toString(), i++),
              makeRow("Year", records.year.toString(), i++),
              makeRowLink("URL", records.url, i++),
            ],
          ),
        ),
      ),
    );
  }
}

TableRow makeRow(String rowTitle, String rowValue, int i) {
  return TableRow(
    decoration: (i % 2 == 0) ? BoxDecoration(color: Colors.grey) : null,
    children: [
      Padding(
        padding: const EdgeInsets.all(8.0),
        child: TableCell(
            verticalAlignment: TableCellVerticalAlignment.middle,
            child: Wrap(
              // mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: <Widget>[
                new Text(
                  rowTitle + " : ",
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                ),
                new Text(rowValue == null ? "-" : rowValue)
              ],
            )),
      )
    ],
  );
}

TableRow makeRowLink(String rowTitle, String rowValue, int i) {
  return TableRow(
    decoration: (i % 2 == 0) ? BoxDecoration(color: Colors.grey) : null,
    children: [
      Padding(
        padding: const EdgeInsets.all(8.0),
        child: TableCell(
            verticalAlignment: TableCellVerticalAlignment.middle,
            child: Wrap(
              // mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: <Widget>[
                new Text(
                  rowTitle + " : ",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),
                GestureDetector(
                  child: new Text("Know More from the site. Click here.",
                      style: TextStyle(color: Colors.blue)),
                  onTap: () {
                    launch(rowValue == null ? "-" : rowValue);
                  },
                )
              ],
            )),
      )
    ],
  );
}
