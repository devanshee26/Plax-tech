import 'package:flutter/material.dart';
import 'package:uniplacement/assets/color.dart';
import 'package:uniplacement/module/add_on/drawer/drawer.dart';
import 'package:uniplacement/routes/routes.dart';
// import 'package:uniplacement/module/drawer/drawer.dart';
// import 'package:uniplacement/widgets/drawer.dart';
import 'package:url_launcher/url_launcher.dart';

class AboutUsPage extends StatelessWidget {
  static const String routeName = '/aboutus';

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: AppBar(
        title: Text("About Us"),
      ),
      drawer: AppDrawer(),
      body: ListView(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: ListTile(
              title: Text(
                'Build Version',
                style: Theme.of(context).textTheme.bodyText2,
              ),
              subtitle: Text('1.0.0'),
              tileColor: uniSurfaceWhite,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: GestureDetector(
              onTap: () =>
                  Navigator.pushReplacementNamed(context, Routes.license),
              child: ListTile(
                title: Text(
                  'Open-source liscences',
                  style: Theme.of(context).textTheme.bodyText2,
                ),
                subtitle: Text('Licence details for open-source details'),
                tileColor: uniSurfaceWhite,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: GestureDetector(
              onTap: () async {
                const url = 'http://www.plax.tech/#/terms';
                if (await canLaunch(url)) {
                  await launch(url);
                } else {
                  throw 'Could not launch $url';
                }
              },
              child: ListTile(
                title: Text(
                  'Terms of Service',
                  style: Theme.of(context).textTheme.bodyText2,
                ),
                tileColor: uniSurfaceWhite,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: GestureDetector(
              onTap: () =>
                  Navigator.pushReplacementNamed(context, Routes.author),
              child: ListTile(
                title: Text(
                  'Developers',
                  style: Theme.of(context).textTheme.bodyText2,
                ),
                subtitle: Text('Made with ❤'),
                tileColor: uniSurfaceWhite,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
