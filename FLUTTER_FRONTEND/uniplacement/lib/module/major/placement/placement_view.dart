import 'package:flutter/material.dart';
// import 'package:uniplacement/assets/color.dart';
// import 'package:flutter_signin_button/flutter_signin_button.dart';
// import 'package:uniplacement/assets/color.dart';
import 'package:uniplacement/module/add_on/drawer/drawer.dart';
import 'package:uniplacement/module/major/placement/off_campus.dart';
import 'package:uniplacement/module/major/placement/past_record.dart';
import 'package:uniplacement/module/major/placement/prediction.dart';
// import 'package:uniplacement/routes/routes.dart';  
// import 'package:uniplacement/module/drawer/drawer.dart';
// import 'package:uniplacement/widgets/drawer.dart';

class PlacementPage extends StatelessWidget {
  static const String routeName = '/placement';

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: AppBar(
        title: Text("Placement"),
      ),
      drawer: AppDrawer(),
      body: ListView(
        children: <Widget>[
          GestureDetector(
            //for past record
            child: _placementCard(
                'https://storage.googleapis.com/placement_assets/PLACEMENT_IMAGES/on_campus.jpg',
                'On Campus',
                'Find the record of the previous batches. Know about the companies who visited the campus in past  >>'),
            onTap: () => Navigator.of(context)
                .push(MaterialPageRoute(builder: (context) => PastPage())),
          ),
          GestureDetector(
            //off campus
            child: _placementCard(
                'https://storage.googleapis.com/placement_assets/PLACEMENT_IMAGES/off_campus.jpg',
                'Off Campus',
                'Know More about the off campus opportunities  >>'),
            onTap: () => Navigator.of(context)
                .push(MaterialPageRoute(builder: (context) => OffCampusPage())),
          ),
          GestureDetector(
            //prediction
            child: _placementCard(
                'https://storage.googleapis.com/placement_assets/PLACEMENT_IMAGES/prediction.jpg',
                'Prediction',
                'Based on the past, we predict the future. Data knows everything. Learn about the companies who can come this year for recruitments  >>'),
            onTap: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => PredictionPage())),
          ),
        ],
      ),
    );
  }

  Widget _placementCard(String imgPath, String titleC, String description) {
    return Stack(
      children: <Widget>[
        Card(
          semanticContainer: true,
          clipBehavior: Clip.antiAliasWithSaveLayer,
          child: Container(
            child: Image.network(
              imgPath,
              color: Color.fromRGBO(255, 255, 255, 0.3),
              colorBlendMode: BlendMode.modulate,
              fit: BoxFit.fill,
            ),
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
          elevation: 5,
          margin: EdgeInsets.all(15),
        ),
        Center(
          child: Padding(
            padding: const EdgeInsets.all(100.0),
            child: Text(
              titleC,
              style: TextStyle(
                fontSize: 25,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(10.0),
          child: Center(
            child: Padding(
              padding: const EdgeInsets.only(top: 130.0, left: 25, right: 23),
              child: Text(
                description,
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
