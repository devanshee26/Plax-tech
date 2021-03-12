import 'package:flutter/material.dart';
// import 'package:flutter_html/style.dart';
import 'package:uniplacement/assets/color.dart';
import 'package:uniplacement/module/add_on/drawer/drawer.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:uniplacement/module/major/blog/blog_view.dart';
import 'package:uniplacement/module/major/competitive_coding/coding_questions.dart';
// import 'package:uniplacement/assets/color.dart';
// import 'package:uniplacement/assets/cut_corner_button.dart';
// import 'package:uniplacement/module/drawer/drawer.dart';
import 'package:http/http.dart' as http;
import 'package:uniplacement/module/major/competitive_coding/coding_view.dart';
import 'package:uniplacement/module/major/placement/off_campus.dart';
import 'dart:convert';

import 'package:uniplacement/module/major/quiz/quiz1.dart';

class HomePage extends StatefulWidget {
  static const String routeName = '/home';

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _currentIndex = 0;

  int val = 4;
  List cardList = [
    BlogCard(
        "https://storage.googleapis.com/sdp-university-placement-portal/images/6041be141baaf70034f5b2ee_i1.jpg",
        "Devanshee Vankani",
        "Interview Preparation"),
    BlogCard(
        "https://storage.googleapis.com/sdp-university-placement-portal/images/6041ce941baaf70034f5b2f5_p1.jpg",
        "Devanshee Vankani",
        "Placement or Masters"),
    BlogCard(
        "https://storage.googleapis.com/sdp-university-placement-portal/images/6041c2171baaf70034f5b2f3_r1.jpg",
        "Devanshee Vankani",
        "Resume")
  ];
  List<T> map<T>(List list, Function handler) {
    List<T> result = [];
    for (var i = 0; i < list.length; i++) {
      result.add(handler(i, list[i]));
    }
    return result;
  }

  Future<List<Questions>> questions;
  final String url = 'https://api.plax.tech/coding/get';

  Future<List<Record>> records;
  final String urlp = 'https://api.plax.tech/placement/naukri';

  Future<List<Questions>> parseCode() async {
    final response = await http.get(url);
    final responseBody = response.body;
    final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();

    return parsed.map<Questions>((json) => Questions.fromJson(json)).toList();
  }

  Future<List<Record>> parseRecords() async {
    final response = await http.get(urlp);
    final responseBody = response.body;
    final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();

    return parsed.map<Record>((json) => Record.fromJson(json)).toList();
  }

  void startQuiz(subject) {
    setState(() {
      Navigator.push(
          context,
          new MaterialPageRoute(
              builder: (context) => new Quiz1(subject: subject)));
    });
  }

  @override
  Widget build(BuildContext context) {
    questions = parseCode();
    records = parseRecords();
    return Scaffold(
        // appBar: AppBar(
        //   title:
        //       Text("Home page", style: Theme.of(context).textTheme.headline5),
        // ),
        drawer: AppDrawer(),
        body: NestedScrollView(
          headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
            return <Widget>[
              SliverAppBar(
                expandedHeight: 200.0,
                floating: false,
                pinned: true,
                flexibleSpace: FlexibleSpaceBar(
                    centerTitle: true,
                    title: Text("Plax : The Placement App",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16.0,
                        )),
                    background: Image.network(
                      // "https://storage.googleapis.com/placement_assets/PLACEMENT_IMAGES/home.jpg",
                      // "https://storage.googleapis.com/placement_assets/PLACEMENT_IMAGES/h2.jpg",
                      // "https://storage.googleapis.com/placement_assets/PLACEMENT_IMAGES/h3.jpg",
                      // "https://storage.googleapis.com/placement_assets/PLACEMENT_IMAGES/h4.jpg",
                      // "https://storage.googleapis.com/placement_assets/PLACEMENT_IMAGES/h5.jpg",
                      "https://storage.googleapis.com/placement_assets/PLACEMENT_IMAGES/h6.jpg",
                      fit: BoxFit.cover,
                    )),
              ),
            ];
          },
          body: ListView(
            scrollDirection: Axis.vertical,
            shrinkWrap: true,
            children: <Widget>[
              Center(
                  child: Text(
                "Read Blogs",
                style: TextStyle(fontSize: 20),
              )),
              CarouselSlider(
                options: CarouselOptions(
                  height: MediaQuery.of(context).size.height * 0.30,
                  autoPlay: true,
                  autoPlayInterval: Duration(seconds: 3),
                  autoPlayAnimationDuration: Duration(milliseconds: 800),
                  autoPlayCurve: Curves.fastOutSlowIn,
                  pauseAutoPlayOnTouch: true,
                  aspectRatio: 2.0,
                  onPageChanged: (index, reason) {
                    setState(() {
                      _currentIndex = index;
                    });
                  },
                ),
                items: cardList.map((card) {
                  return Builder(builder: (BuildContext context) {
                    return Container(
                      height: MediaQuery.of(context).size.height * 0.40,
                      width: MediaQuery.of(context).size.width,
                      child: Card(
                        color: Colors.blueAccent,
                        child: card,
                      ),
                    );
                  });
                }).toList(),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: map<Widget>(cardList, (index, url) {
                  return Container(
                    width: 10.0,
                    height: 10.0,
                    margin:
                        EdgeInsets.symmetric(vertical: 10.0, horizontal: 2.0),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: _currentIndex == index ? uniBlue : Colors.grey,
                    ),
                  );
                }),
              ),
              SizedBox(
                height: 10,
              ),
              Center(
                  child: Text(
                "Competitive Coding",
                style: TextStyle(fontSize: 20),
              )),
              FutureBuilder<List<Questions>>(
                  future: questions,
                  builder: (BuildContext context,
                      AsyncSnapshot<List<Questions>> snapshot) {
                    return snapshot.hasData
                        ? GridView.builder(
                            shrinkWrap: true,
                            itemCount: 4,
                            physics: const NeverScrollableScrollPhysics(),
                            gridDelegate:
                                SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 2,
                            ),
                            itemBuilder: (context, index) {
                              // return Text("${snapshot.data[index].title}");
                              return getCodeCard(snapshot.data[index], context);
                            })
                        : Center(child: CircularProgressIndicator());
                  }),
              SizedBox(
                height: 20,
              ),
              Center(
                  child: Text(
                "Placement Opportunities",
                style: TextStyle(fontSize: 20),
              )),
              FutureBuilder<List<Record>>(
                future: records,
                builder: (context, snapshot) {
                  if (snapshot.hasError) print(snapshot.error);
                  return snapshot.hasData
                      ? PlcList(rcd: snapshot.data)
                      : Center(child: CircularProgressIndicator());
                },
              ),
              SizedBox(
                height: 10,
              ),
              Center(
                  child: Text(
                'Aptitute Questions',
                style: TextStyle(fontSize: 20),
              )),
              getTile("Login and Reasoning", "subtitle"),
              getTile("Coding", "subtitle"),
              getTile("Language", "subtitle"),
              getTile("CS fundamental", "subtitle"),
            ],
          ),
        ));
  }

  Widget getTile(String title, String subtitle) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: GestureDetector(
        onTap: () => {startQuiz(title)},
        child: ListTile(title: Text(title), tileColor: uniQuizQuestionStatus),
      ),
    );
  }
}

class BlogCard extends StatelessWidget {
  final String url;
  final String author;
  final String title;
  BlogCard(this.url, this.author, this.title);
  @override
  Widget build(BuildContext context) {
    return Container(
      child: GestureDetector(
        onTap: () {
          Navigator.push(
              context, MaterialPageRoute(builder: (context) => BlogPage()));
        },
        child: Card(
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(8.0))),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(8.0),
                    topRight: Radius.circular(8.0),
                  ),
                  // child: Text('Add image background here'),
                  child: Container(
                    child: Image.network(
                      url,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              Text(title),
              Text(
                author,
                style: TextStyle(fontSize: 15),
              ),
              // ListTile(
              //   title: Text('title'),
              //   subtitle: Text('author'),
              // ),
            ],
          ),
        ),
      ),
    );
  }
}

Widget getCodeCard(Questions questions, BuildContext context) {
  return Padding(
    padding: const EdgeInsets.all(5.0),
    child: Card(
      color: uniYellow,
      elevation: 10,
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            ListTile(
              title: Text(
                questions.title,
                style: TextStyle(fontSize: 20),
              ),
              subtitle: Text("Author: " + questions.author),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 8, left: 1),
              child: Text("Time limit:" +
                  questions.timeLimit +
                  "s\n" +
                  "Memory limit: " +
                  questions.memoryLimit +
                  "kb"),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: MaterialButton(
                color: Colors.amber[100],
                child: Text("Solve Now"),
                onPressed: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              CodingPage(question: questions)));
                },
              ),
            ),
          ],
        ),
      ),
    ),
  );
}

class PlcList extends StatelessWidget {
  final List<Record> rcd;
  PlcList({Key key, this.rcd});
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      scrollDirection: Axis.vertical,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: 4,
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
                  title: Text(rcd[index].company),
                  subtitle: Text(rcd[index].title + " " + rcd[index].location),
                  leading: Icon(Icons.location_city),
                ),
                Padding(
                  padding: const EdgeInsets.all(5.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      SizedBox(
                        width: 70,
                      ),
                      Text("Experience  Required : " + rcd[index].experience),
                    ],
                  ),
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
                                      DetailedRecord(records: rcd[index])));
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
