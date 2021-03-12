import 'package:flutter/material.dart';
import 'package:uniplacement/assets/color.dart';
import 'package:uniplacement/module/add_on/drawer/drawer.dart';
import 'package:uniplacement/module/major/competitive_coding/coding_view.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

// import 'package:uniplacement/module/major/quiz/quiz1.dart';
// import 'package:uniplacement/module/drawer/drawer.dart';
// import 'package:uniplacement/widgets/drawer.dart';

class CodingQuestionsPage extends StatelessWidget {
  static const String routeName = '/codingquestions';
  Future<List<Questions>> questions;
  final String url = 'https://api.plax.tech/coding/get';

  Future<List<Questions>> parsePosts() async {
    final response = await http.get(url);
    final responseBody = response.body;
    final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();

    return parsed.map<Questions>((json) => Questions.fromJson(json)).toList();
  }

  @override
  Widget build(BuildContext context) {
    questions = parsePosts();
    return new Scaffold(
        appBar: AppBar(
          title: Text("Coding Questions"),
        ),
        drawer: AppDrawer(),
        body: Center(
          child: FutureBuilder<List<Questions>>(
            future: questions,
            builder: (context, snapshot) {
              if (snapshot.hasError) print(snapshot.error);
              return snapshot.hasData
                  ? QuestionList(questions: snapshot.data)
                  : Center(child: CircularProgressIndicator());
            },
          ),
        ));
  }
}

class QuestionList extends StatelessWidget {
  final List<Questions> questions;

  QuestionList({Key key, this.questions});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: questions.length,
      itemBuilder: (context, index) {
        return Padding(
          padding: const EdgeInsets.all(10.0),
          child: Container(
            child: Card(
              color: uniQuizQuestionStatus,
              elevation: 10,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  ListTile(
                    leading: Icon(Icons.book),
                    title: Text(
                      questions[index].title,
                      style: TextStyle(fontSize: 20),
                    ),
                    subtitle: Text("Author: " + questions[index].author),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text("Time limit:" +
                        questions[index].timeLimit +
                        "s" +
                        " Memory limit: " +
                        questions[index].memoryLimit +
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
                                    CodingPage(question: questions[index])));
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class Questions {
  final String id,
      title,
      problemStatement,
      timeLimit,
      memoryLimit,
      solution,
      author;
  final List<TestCase> sampleTestCases, testCases;

  Questions(
      {this.id,
      this.title,
      this.problemStatement,
      this.timeLimit,
      this.memoryLimit,
      this.solution,
      this.author,
      this.sampleTestCases,
      this.testCases});

  factory Questions.fromJson(Map json) {
    TestCase tc;
    List<TestCase> temporarySampleTestCasesList = <TestCase>[];
    for (int i = 0; i < json['SampleTestCases'].length; i++) {
      tc = TestCase.fromJson(json['SampleTestCases'][i]);
      temporarySampleTestCasesList.add(tc);
    }
    List<TestCase> temporaryTestCasesList = <TestCase>[];
    for (int i = 0; i < json['TestCases'].length; i++) {
      tc = TestCase.fromJson(json['TestCases'][i]);
      temporaryTestCasesList.add(tc);
    }
    return Questions(
        id: json['_id'],
        title: json['title'],
        problemStatement: json['ProblemStatement'],
        timeLimit: json['TimeLimit'].toString(),
        memoryLimit: json['MemoryLimit'].toString(),
        solution: json['Solution'],
        author: json['author'],
        sampleTestCases: temporarySampleTestCasesList,
        testCases: temporaryTestCasesList);
  }
}

class TestCase {
  final String test, output;

  TestCase({this.test, this.output});

  factory TestCase.fromJson(Map json) {
    return TestCase(test: json['test'], output: json['output']);
  }
}
