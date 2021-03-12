import 'package:flutter/material.dart';
import 'package:uniplacement/module/add_on/drawer/drawer.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Quiz1 extends StatefulWidget {
  final String subject;

  Quiz1({this.subject});

  @override
  State<StatefulWidget> createState() {
    return new _Quiz1State(subject: this.subject);
  }
}

class QuizData {
  var question = [];
  var options = [];
  var answers = [];
}

class _Quiz1State extends State<Quiz1> {
  List<int> answer = [0, 0, 0];
  var finalScore = 0;
  int currentStep = 0;
  bool complete = false;
  String subject;
  Future<List<Question>> questions;

  _Quiz1State({this.subject});

  var quiz;

  Future<List<Question>> parseQuesion() async {
    final String url = 'https://api.plax.tech/quiz/get/' + this.subject;
    String response = '[';
    var response1 = await http.get(url);
    response += response1.body + ',';
    var response2 = await http.get(url);
    response += response2.body + ',';
    var response3 = await http.get(url);
    response += response3.body;
    response = response + ']';
    final parsed = jsonDecode(response).cast<Map<String, dynamic>>();
    return parsed.map<Question>((json) => Question.fromJson(json)).toList();
  }

  @override
  Widget build(BuildContext context) {
    questions = parseQuesion();
    return Scaffold(
      appBar: AppBar(
        title: Text("Quiz page"),
      ),
      drawer: AppDrawer(),
      body: FutureBuilder<List<Question>>(
        future: questions,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            var question = snapshot.data;
            this.quiz = new QuizData();
            for (var i = 0; i < question.length; i++) {
              this.quiz.question.add(question[i].question);
              this.quiz.answers.add(question[i].correctAnswer);
              this.quiz.options.add(question[i].options);
            }
            List<Step> steps = [
              Step(
                title: const Text('Question 1'),
                isActive: true,
                state: StepState.editing,
                content: Column(
                  children: <Widget>[
                    Text(quiz.question[0]),
                    Column(
                      children: <Widget>[
                        ListTile(
                          title: Text(quiz.options[0][0]),
                          leading: Radio(
                            value: 0,
                            groupValue: answer[0],
                            onChanged: (int value) {
                              setState(() {
                                answer[0] = value;
                              });
                            },
                          ),
                        ),
                        ListTile(
                          title: Text(quiz.options[0][1]),
                          leading: Radio(
                            value: 1,
                            groupValue: answer[0],
                            onChanged: (int value) {
                              setState(() {
                                answer[0] = value;
                              });
                            },
                          ),
                        ),
                        ListTile(
                          title: Text(quiz.options[0][2]),
                          leading: Radio(
                            value: 2,
                            groupValue: answer[0],
                            onChanged: (int value) {
                              setState(() {
                                answer[0] = value;
                              });
                            },
                          ),
                        ),
                        ListTile(
                          title: Text(quiz.options[0][3]),
                          leading: Radio(
                            value: 3,
                            groupValue: answer[0],
                            onChanged: (int value) {
                              setState(() {
                                answer[0] = value;
                              });
                            },
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ),
              Step(
                isActive: false,
                state: StepState.editing,
                title: const Text('Question 2'),
                content: Column(
                  children: <Widget>[
                    Text(quiz.question[1]),
                    Column(
                      children: <Widget>[
                        ListTile(
                          title: Text(quiz.options[1][0]),
                          leading: Radio(
                            value: 0,
                            groupValue: answer[1],
                            onChanged: (int value) {
                              setState(() {
                                answer[1] = value;
                              });
                            },
                          ),
                        ),
                        ListTile(
                          title: Text(quiz.options[1][1]),
                          leading: Radio(
                            value: 1,
                            groupValue: answer[1],
                            onChanged: (int value) {
                              setState(() {
                                answer[1] = value;
                              });
                            },
                          ),
                        ),
                        ListTile(
                          title: Text(quiz.options[1][2]),
                          leading: Radio(
                            value: 2,
                            groupValue: answer[1],
                            onChanged: (int value) {
                              setState(() {
                                answer[1] = value;
                              });
                            },
                          ),
                        ),
                        ListTile(
                          title: Text(quiz.options[1][3]),
                          leading: Radio(
                            value: 3,
                            groupValue: answer[1],
                            onChanged: (int value) {
                              setState(() {
                                answer[1] = value;
                              });
                            },
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ),
              Step(
                state: StepState.complete,
                title: const Text('Question 3'),
                content: Column(
                  children: <Widget>[
                    Text(quiz.question[2]),
                    Column(
                      children: <Widget>[
                        ListTile(
                          title: Text(quiz.options[2][0]),
                          leading: Radio(
                            value: 0,
                            groupValue: answer[2],
                            onChanged: (int value) {
                              setState(() {
                                answer[2] = value;
                              });
                            },
                          ),
                        ),
                        ListTile(
                          title: Text(quiz.options[2][1]),
                          leading: Radio(
                            value: 1,
                            groupValue: answer[2],
                            onChanged: (int value) {
                              setState(() {
                                answer[2] = value;
                              });
                            },
                          ),
                        ),
                        ListTile(
                          title: Text(quiz.options[2][2]),
                          leading: Radio(
                            value: 2,
                            groupValue: answer[2],
                            onChanged: (int value) {
                              setState(() {
                                answer[2] = value;
                              });
                            },
                          ),
                        ),
                        ListTile(
                          title: Text(quiz.options[2][3]),
                          leading: Radio(
                            value: 3,
                            groupValue: answer[2],
                            onChanged: (int value) {
                              setState(() {
                                answer[2] = value;
                              });
                            },
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ),
            ];
            return Column(children: <Widget>[
              complete
                  ? Expanded(
                      child: Center(
                        child: AlertDialog(
                          title: new Text("Scores"),
                          content: new Text(finalScore.toString()),
                          actions: <Widget>[
                            new FlatButton(
                              child: new Text("Close"),
                              onPressed: () {
                                setState(() => complete = false);
                              },
                            ),
                          ],
                        ),
                      ),
                    )
                  : Expanded(
                      child: Stepper(
                        steps: steps,
                        currentStep: currentStep,
                        onStepContinue: next,
                        onStepTapped: (step) => goTo(step),
                        onStepCancel: cancel,
                      ),
                    ),
            ]);
          } else {
            return Center(child: CircularProgressIndicator());
          }
        },
      ),
    );
  }

  next() {
    if (this.quiz.answers[currentStep] ==
        this.quiz.options[currentStep][answer[currentStep]]) {
      finalScore++;
    }
    currentStep + 1 != 3
        ? goTo(currentStep + 1)
        : setState(() => complete = true);
  }

  cancel() {
    if (this.quiz.answers[currentStep] ==
        this.quiz.options[currentStep][answer[currentStep]]) {
      finalScore--;
    }
    if (currentStep > 0) {
      setState(() => currentStep = currentStep - 1);

      if (this.quiz.answers[currentStep] ==
          this.quiz.options[currentStep][answer[currentStep]]) {
        finalScore--;
      }
    }
  }

  goTo(int step) {
    setState(() => currentStep = step);
  }
}

class Question {
  final String question, subject, correctAnswer;
  final List<String> options;

  Question({this.question, this.subject, this.correctAnswer, this.options});

  factory Question.fromJson(Map json) {
    String option;
    List<String> temporaryList = <String>[];
    for (int i = 0; i < json['options'].length; i++) {
      option = json['options'][i];
      temporaryList.add(option);
    }
    return Question(
        question: json['question'],
        subject: json['subject'],
        correctAnswer: json['correct_answer'],
        options: temporaryList);
  }
}
