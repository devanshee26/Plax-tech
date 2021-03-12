import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:uniplacement/assets/color.dart';
import 'package:uniplacement/module/add_on/drawer/drawer.dart';
// import 'package:uniplacement/module/drawer/drawer.dart';
// import 'package:uniplacement/widgets/drawer.dart';
import 'package:horizontal_picker/horizontal_picker.dart';
import 'package:numberpicker/numberpicker.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;

class PredictionPage extends StatelessWidget {
  static const String routeName = '/prediction';

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: AppBar(
          title: Text("Prediction"),
        ),
        drawer: AppDrawer(),
        body: Padding(
          padding: const EdgeInsets.all(20.0),
          child: PredictForm(),
        ));
  }
}

class PredictForm extends StatefulWidget {
  @override
  _PredictFormState createState() => _PredictFormState();
}

class _PredictFormState extends State<PredictForm> {
  int _currentValue = 0;

  int selectedGender = 0;
  int selectedStream = 0;
  int selectedField = 0;

  bool specialisation = false;
  double hsc = 75.0;
  double ssc = 75.0;
  double bcpi = 7.5;
  double mcpi = 0.0;
  int workexp = 0;

  var isLoading = false;

  setSelectedGender(int val) {
    setState(() {
      selectedGender = val;
    });
  }

  setSelectedStream(int val) {
    setState(() {
      selectedStream = val;
    });
  }

  setSelectedField(int val) {
    setState(() {
      selectedField = val;
    });
  }

  Decoration _decoration = new BoxDecoration(
    border: new Border(
      top: new BorderSide(
        style: BorderStyle.solid,
        color: Colors.black26,
      ),
      bottom: new BorderSide(
        style: BorderStyle.solid,
        color: Colors.black26,
      ),
    ),
  );

  @override
  Widget build(BuildContext context) {
    return Form(
      child: ListView(
        children: <Widget>[
          Row(children: <Widget>[
            Expanded(child: Divider()),
            Text("SSC Percentage"),
            Expanded(child: Divider()),
          ]),
          Flexible(
            child: HorizantalPicker(
              minValue: 50,
              maxValue: 100,
              divisions: 50,
              suffix: "%",
              showCursor: true,
              cursorColor: uniGray,
              backgroundColor: uniBackground,
              activeItemTextColor: Colors.amber,
              passiveItemsTextColor: uniBlue,
              onChanged: (value) {
                ssc = value;
              },
            ),
          ),
          Row(children: <Widget>[
            Expanded(child: Divider()),
            Text("HSC Percentage"),
            Expanded(child: Divider()),
          ]),
          Flexible(
            child: HorizantalPicker(
              minValue: 50,
              maxValue: 100,
              divisions: 50,
              suffix: "%",
              showCursor: true,
              cursorColor: uniGray,
              backgroundColor: uniBackground,
              activeItemTextColor: Colors.amber,
              passiveItemsTextColor: uniBlue,
              onChanged: (value) {
                hsc = value;
              },
            ),
          ),
          Row(children: <Widget>[
            Expanded(child: Divider()),
            Text("B.Tech CPI"),
            Expanded(child: Divider()),
          ]),
          Flexible(
            child: HorizantalPicker(
              minValue: 5.5,
              maxValue: 10,
              divisions: 50,
              suffix: "CPI",
              showCursor: true,
              cursorColor: uniGray,
              backgroundColor: uniBackground,
              activeItemTextColor: Colors.amber,
              passiveItemsTextColor: uniBlue,
              onChanged: (value) {
                bcpi = value;
              },
            ),
          ),
          Row(children: <Widget>[
            Expanded(child: Divider()),
            Text("Work Experience"),
            Expanded(child: Divider()),
          ]),
          NumberPicker.integer(
              decoration: _decoration,
              initialValue: _currentValue,
              minValue: 0,
              maxValue: 10,
              onChanged: (newValue) =>
                  setState(() => _currentValue = newValue)),
          SizedBox(
            height: 10,
          ),
          Row(children: <Widget>[
            Expanded(child: Divider()),
            Text("Gender"),
            Expanded(child: Divider()),
          ]),
          SizedBox(
            height: 20,
          ),
          ButtonBar(
            alignment: MainAxisAlignment.center,
            children: <Widget>[
              Text('Male'),
              Radio(
                value: 1,
                groupValue: selectedGender,
                activeColor: Colors.green,
                onChanged: (val) {
                  setSelectedGender(val);
                },
              ),
              Text('Female'),
              Radio(
                value: 2,
                groupValue: selectedGender,
                activeColor: Colors.blue,
                onChanged: (val) {
                  setSelectedGender(val);
                },
              )
            ],
          ),
          Row(children: <Widget>[
            Expanded(child: Divider()),
            Text("HSC Stream"),
            Expanded(child: Divider()),
          ]),
          SizedBox(
            height: 10,
          ),
          ButtonBar(
            alignment: MainAxisAlignment.center,
            children: <Widget>[
              Text('Science'),
              Radio(
                value: 1,
                groupValue: selectedStream,
                activeColor: Colors.green,
                onChanged: (val) {
                  setSelectedStream(val);
                },
              ),
              Text('Commerce'),
              Radio(
                value: 2,
                groupValue: selectedStream,
                activeColor: Colors.blue,
                onChanged: (val) {
                  setSelectedStream(val);
                },
              ),
              Text('Arts'),
              Radio(
                value: 3,
                groupValue: selectedStream,
                activeColor: Colors.blue,
                onChanged: (val) {
                  setSelectedStream(val);
                },
              )
            ],
          ),
          SizedBox(
            height: 20,
          ),
          Row(children: <Widget>[
            Expanded(child: Divider()),
            Text("Bachlor"),
            Expanded(child: Divider()),
          ]),
          ButtonBar(
            alignment: MainAxisAlignment.center,
            children: <Widget>[
              Text('Engineering'),
              Radio(
                value: 1,
                groupValue: selectedField,
                activeColor: Colors.green,
                onChanged: (val) {
                  setSelectedField(val);
                },
              ),
              Text('Management'),
              Radio(
                value: 2,
                groupValue: selectedField,
                activeColor: Colors.blue,
                onChanged: (val) {
                  setSelectedField(val);
                },
              ),
              Text('Others'),
              Radio(
                value: 3,
                groupValue: selectedField,
                activeColor: Colors.blue,
                onChanged: (val) {
                  print("Radio $val");
                  setSelectedField(val);
                },
              )
            ],
          ),
          CheckboxListTile(
            title: Text("Specialization"),
            value: specialisation,
            onChanged: (newValue) {
              setState(() {
                specialisation = newValue;
              });
            },
            controlAffinity:
                ListTileControlAffinity.leading, //  <-- leading Checkbox
          ),
          Row(children: <Widget>[
            Expanded(child: Divider()),
            Text("Specization Percentage"),
            Expanded(child: Divider()),
          ]),
          Flexible(
            child: HorizantalPicker(
              minValue: 50,
              maxValue: 100,
              divisions: 50,
              suffix: "%",
              showCursor: true,
              cursorColor: uniGray,
              backgroundColor: uniBackground,
              activeItemTextColor: Colors.amber,
              passiveItemsTextColor: uniBlue,
              onChanged: (value) {
                mcpi = value;
              },
            ),
          ),
          new Container(
              child: new MaterialButton(
            color: uniPink10,
            elevation: 10,
            child: const Text('Predict Now'),
            onPressed: () => _submit(),
            // onPressed: () {

            //   It returns true if the form is valid, otherwise returns false
            //   if (_formKey.currentState.validate()) {
            //     // If the form is valid, display a Snackbar.
            //     Scaffold.of(context).showSnackBar(
            //         SnackBar(content: Text('Data is in processing.')));
            //   }
            // },
          )),
        ],
      ),
    );
  }

  void _submit() {
    if (selectedGender == 0 || selectedField == 0 || selectedStream == 0) {
      print('invalid');
      Fluttertoast.showToast(
          msg: "Please select all the details",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: uniGray,
          textColor: Colors.white,
          fontSize: 16.0);
      return;
    }
    prediction();
  }

  prediction() async {
    final uri = "https://cloud9032.appspot.com/predict";
    var request = new Map<String, dynamic>();

    request['gender'] = selectedGender - 1;
    request['ssc_p'] = ssc;
    request['hsc_p'] = hsc;
    request['degree_p'] = bcpi * 10;
    request['workex'] = workexp;
    request['etest_p'] = 0;
    if (specialisation) {
      request['specialisation'] = 1;
      request['mba_p'] = mcpi * 10;
    } else {
      request['specialisation'] = 0;
      request['mba_p'] = 0;
    }
    request['dummy_Science'] = 0;
    request['dummy_Commerce'] = 0;
    request['dummy_Arts'] = 0;
    switch (selectedStream) {
      case 1: //science
        request['dummy_Science'] = 1;
        break;
      case 2: //commerce
        request['dummy_Commerce'] = 1;
        break;
      case 3: // arts
        request['dummy_Arts'] = 1;
        break;
    }

    request['dummy_Comm&Mgmt'] = 0;
    request['dummy_Others'] = 0;
    request['dummy_Sci&Tech'] = 0;

    switch (selectedField) {
      case 1: //engineering
        request['dummy_Sci&Tech'] = 1;
        break;
      case 2: //management
        request['dummy_Comm&Mgmt'] = 1;
        break;
      case 3:
        request['dummy_Others'] = 1;
        break;
    }
    print(request);
    var response = await http.post(uri, body: jsonEncode(request), headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip,deflate,br',
      'Connection': 'keep-alive'
    });

    final responseBody = response.body;
    Map<String, dynamic> resp = jsonDecode(responseBody);

    print(resp);

    if (resp['prediction'] != null) {
      //do something

    } else {
      //do something else!
    }

    return;
  }
}


