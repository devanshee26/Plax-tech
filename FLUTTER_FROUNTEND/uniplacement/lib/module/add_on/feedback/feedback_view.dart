import 'package:flutter/material.dart';
import 'package:uniplacement/assets/color.dart';
import 'package:uniplacement/module/add_on/drawer/drawer.dart';
// import 'package:uniplacement/module/drawer/drawer.dart';
// import 'package:uniplacement/widgets/drawer.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import 'package:fluttertoast/fluttertoast.dart';

final String url = "https://uppbackend.azurewebsites.net/feedback/add";

class FeedbackPage extends StatelessWidget {
  static const String routeName = '/feedback';

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          title: Text("Feedback"),
        ),
        drawer: AppDrawer(),
        body: Padding(
          padding: const EdgeInsets.all(20.0),
          child: MyCustomForm(),
        ));
  }
}

// Create a Form widget.
class MyCustomForm extends StatefulWidget {
  @override
  MyCustomFormState createState() {
    return MyCustomFormState();
  }
}

// Create a corresponding State class, which holds data related to the form.
class MyCustomFormState extends State<MyCustomForm> {
  // Create a global key that uniquely identifies the Form widget
  // and allows validation of the form.
  final _formKey = GlobalKey<FormState>();

  Future<String> uploadImage(filename) async {
    var request = http.MultipartRequest('POST', Uri.parse(url));
    request.files.add(await http.MultipartFile.fromPath('file', filename));
    var res = await request.send();
    return res.reasonPhrase;
  }

  String state = "";

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey created above.
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(5.0),
            child: TextFormField(
              decoration: const InputDecoration(
                icon: const Icon(Icons.person),
                hintText: 'Enter your full name',
                labelText: 'Name',
              ),
              validator: (value) {
                if (value.isEmpty) {
                  return 'Please enter some text';
                }
                return null;
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(5.0),
            child: TextFormField(
              decoration: const InputDecoration(
                icon: const Icon(Icons.mail),
                hintText: 'name@example.com',
                labelText: 'Email',
              ),
              validator: (value) {
                if (value.isEmpty) {
                  return 'Please enter valid email address';
                }
                return null;
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(5.0),
            child: TextFormField(
              maxLines: 6,
              decoration: const InputDecoration(
                icon: const Icon(Icons.feedback),
                hintText: 'Type your feedback here',
                labelText: 'Your Views',
              ),
              validator: (value) {
                if (value.isEmpty) {
                  return 'Please enter your views';
                }
                return null;
              },
            ),
          ),
          Container(
            padding: const EdgeInsets.only(left: 130.0, top: 40.0),
            child: MaterialButton(
              color: uniQuizQuestionStatus,
              elevation: 5,
              child: new Text('Add A Screenshot'),
              onPressed: () async {
                var file =
                    // ignore: deprecated_member_use
                    await ImagePicker.pickImage(source: ImageSource.gallery);
                var res = await uploadImage(file.path);
                setState(() {
                  state = res;
                  print(res);
                });
              },
            ),
          ),
          new Container(
              padding: const EdgeInsets.only(left: 150.0, top: 40.0),
              child: new MaterialButton(
                color: uniPink10,
                elevation: 10,
                child: const Text('Submit'),
                onPressed: () {
                  // It returns true if the form is valid, otherwise returns false
                  if (_formKey.currentState.validate()) {
                    // If the form is valid, display a Snackbar.
                    if (state == "") {
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                          content: const Text('snack'),
                          duration: const Duration(seconds: 1)));
                    }
                    Fluttertoast.showToast(
                        msg: "Thank you for sharing your feedback!",
                        toastLength: Toast.LENGTH_SHORT,
                        gravity: ToastGravity.CENTER,
                        timeInSecForIosWeb: 1,
                        backgroundColor: uniGray,
                        textColor: Colors.white,
                        fontSize: 16.0);
                  }
                },
              )),
        ],
      ),
    );
  }
}
