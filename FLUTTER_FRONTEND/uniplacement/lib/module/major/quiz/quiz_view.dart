import 'package:flutter/material.dart';
import 'package:uniplacement/assets/color.dart';
import 'package:uniplacement/module/add_on/drawer/drawer.dart';
// import 'package:uniplacement/module/drawer/drawer.dart';
import 'package:uniplacement/module/major/quiz/quiz1.dart';
// import 'package:uniplacement/module/quiz/quiz1.dart';
//import 'package:uniplacement/quiz/quiz1.dart';

class Quiz extends StatefulWidget {
  static const String routeName = '/quiz';

  @override
  State<StatefulWidget> createState() {
    return new _QuizState();
  }
}

class _QuizState extends State<Quiz> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: uniBackground,
      appBar: new AppBar(
        title: new Text("Quiz"),
        // backgroundColor: Colors.cyan,
      ),
      drawer: AppDrawer(),
      body: new Container(
        // color: Color(0xFFf9f7cf),
        padding: EdgeInsets.zero,
        margin: const EdgeInsets.all(15.0),
        child: new Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          // mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(15.0),
              child: SizedBox(
                height: 50.0,
                width: 10.0,
                child: new RaisedButton(
                  color: uniQuizQuestionStatus,
                  elevation: 10,
                  onPressed: () => {startQuiz("Login and Reasoning")},
                  child: new Text(
                    "Logic and Reasoning",
                    style: Theme.of(context).textTheme.bodyText2,
                  ),
                ),
              ),
            ),

            //subject 2
            Padding(
              padding: const EdgeInsets.all(15.0),
              child: SizedBox(
                height: 50.0,
                width: 10.0,
                child: new RaisedButton(
                  color: uniQuizQuestionStatus,
                  elevation: 10,
                  onPressed: () => {startQuiz("Language")},
                  child: new Text(
                    "Language",
                    style: Theme.of(context).textTheme.bodyText2,
                  ),
                ),
              ),
            ),
            //subject 3
            Padding(
              padding: const EdgeInsets.all(15.0),
              child: SizedBox(
                height: 50.0,
                width: 10.0,
                child: new RaisedButton(
                  color: uniQuizQuestionStatus,
                  elevation: 10,
                  onPressed: () => {startQuiz("Coding")},
                  child: new Text(
                    "Coding",
                    style: Theme.of(context).textTheme.bodyText2,
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(15.0),
              child: SizedBox(
                height: 50.0,
                width: 10.0,
                child: new RaisedButton(
                  color: uniQuizQuestionStatus,
                  elevation: 10,
                  onPressed: () => {startQuiz("CS fundamental")},
                  child: new Text(
                    "CS fundamental",
                    style: Theme.of(context).textTheme.bodyText2,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  //method to start the quiz

  void startQuiz(subject) {
    setState(() {
      Navigator.push(
          context,
          new MaterialPageRoute(
              builder: (context) => new Quiz1(subject: subject)));
    });
  }
}
