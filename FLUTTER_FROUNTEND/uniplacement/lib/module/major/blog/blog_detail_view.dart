import 'package:flutter/material.dart';
import 'package:uniplacement/module/add_on/drawer/drawer.dart';
// import 'package:uniplacement/module/drawer/drawer.dart';
// import 'package:uniplacement/widgets/drawer.dart';

class BlogDetailPage extends StatelessWidget {
  static const String routeName = '/blogdetail';

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: AppBar(
          title: Text("Blog Detail"),
        ),
        drawer: AppDrawer(),
        body: Center(child: Text("MS")));
  }
}
