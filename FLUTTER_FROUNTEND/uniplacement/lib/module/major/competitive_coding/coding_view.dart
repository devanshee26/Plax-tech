import 'package:flutter/material.dart';
import 'package:uniplacement/module/add_on/drawer/drawer.dart';
import 'package:uniplacement/module/major/competitive_coding/coding_questions.dart';
import 'package:html2md/html2md.dart' as html2md;
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:flutter_html/flutter_html.dart';
// import 'package:uniplacement/module/drawer/drawer.dart';
// import 'package:uniplacement/widgets/drawer.dart';

class CodingPage extends StatelessWidget {
  static const String routeName = '/coding';
  final Questions question;

  CodingPage({Key key, this.question});

  @override
  Widget build(BuildContext context) {
    double scrwidth = MediaQuery.of(context).size.width * 0.45;
    String markdown = html2md.convert(question.problemStatement);
    return new Scaffold(
        appBar: AppBar(
          title: Text(question.title),
        ),
        drawer: AppDrawer(),
        body: Container(
          color: Colors.grey[200],
          child: ListView(
            shrinkWrap: true,
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: ListTile(
                  tileColor: Colors.grey[400],
                  title: Text(
                    question.title,
                    style: TextStyle(
                      fontSize: 20,
                    ),
                  ),
                  subtitle: Text(
                    question.author,
                    style: TextStyle(fontSize: 15),
                  ),
                ),
              ),
              Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    color: Colors.grey[300],
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Html(data: question.problemStatement),
                    ),
                  )),
              Row(
                children: <Widget>[
                  getTile("Input", question.sampleTestCases[0].test, scrwidth),
                  getTile(
                      "Output", question.sampleTestCases[0].output, scrwidth),
                ],
              ),
              Row(
                children: <Widget>[
                  getTile("Max Memory", question.memoryLimit, scrwidth),
                  getTile("Max Time", question.timeLimit, scrwidth),
                ],
              ),
            ],
          ),
        ));
  }
}

Widget getTile(String title, String value, double scrwidth) {
  return Padding(
    padding: const EdgeInsets.all(8.0),
    child: Container(
      width: scrwidth,
      color: Colors.grey[300],
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Text(title + "\n" + value),
      ),
    ),
  );
}
