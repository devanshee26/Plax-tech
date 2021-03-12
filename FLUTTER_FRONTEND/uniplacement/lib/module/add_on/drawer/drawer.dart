import 'package:flutter/material.dart';
import 'package:uniplacement/assets/color.dart';
import 'package:uniplacement/module/add_on/about_us/about_us_view.dart';
import 'package:uniplacement/module/add_on/feedback/feedback_view.dart';
import 'package:uniplacement/module/add_on/home/home_page.dart';
import 'package:uniplacement/module/major/blog/blog_view.dart';
import 'package:uniplacement/module/major/competitive_coding/coding_questions.dart';
// import 'package:uniplacement/module/major/competitive_coding/coding_view.dart';
import 'package:uniplacement/module/major/placement/placement_view.dart';
import 'package:uniplacement/module/major/quiz/quiz_view.dart';
// import 'package:uniplacement/routes/routes.dart';

class AppDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        color: uniBackground,
        // _createHeader(),
        child: ListView(
          padding: EdgeInsets.zero,
          // _createHeader(),
          children: <Widget>[
            _createHeader(context),
            _createDrawerItem(
                icon: Icons.read_more,
                text: 'Blog',
                onTap: () => Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) => BlogPage())),
                context: context),
            _createDrawerItem(
                icon: Icons.question_answer,
                text: 'Quiz',
                onTap: () => Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) => Quiz())),
                context: context),
            _createDrawerItem(
                icon: Icons.text_fields,
                text: 'Competitve Coding',
                onTap: () => Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => CodingQuestionsPage())),
                context: context),
            _createDrawerItem(
                icon: Icons.fiber_manual_record,
                text: 'Placement',
                onTap: () => Navigator.of(context).push(
                    MaterialPageRoute(builder: (context) => PlacementPage())),
                context: context),
            // _createDrawerItem(
            //     icon: Icons.accessibility_new,
            //     text: 'Off Campus',
            //     onTap: () =>
            //         Navigator.pushReplacementNamed(context, Routes.offcampus),
            //     context: context),
            Divider(height: 10, thickness: 1.5),

            // _createDrawerItem(
            //     icon: Icons.stars,
            //     text: 'Rate App',
            //     onTap: () =>
            //         Navigator.pushReplacementNamed(context, Routes.rateapp),
            //     context: context),
            _createDrawerItem(
                icon: Icons.question_answer_rounded,
                text: 'Help and Feedback',
                onTap: () => Navigator.of(context).push(
                    MaterialPageRoute(builder: (context) => FeedbackPage())),
                context: context),
            _createDrawerItem(
                icon: Icons.group_outlined,
                text: 'About Plax',
                onTap: () => Navigator.of(context).push(
                    MaterialPageRoute(builder: (context) => AboutUsPage())),
                context: context),
            Divider(height: 5, thickness: 1.5),

            //Expanded(child: null),
            // _createDrawerFooter(),
            // _createDrawerItem(icon: Icons.bug_report, text: 'Report an issue'),
          ],
        ),
      ),
    );
  }
}

Widget _createHeader(BuildContext context) {
  return GestureDetector(
    onTap: () => Navigator.of(context)
        .push(MaterialPageRoute(builder: (context) => HomePage())),
    child: DrawerHeader(
        margin: EdgeInsets.zero,
        padding: EdgeInsets.zero,
        decoration: BoxDecoration(
            image: DecorationImage(
                fit: BoxFit.fill,
                image: AssetImage(
                    'lib/assets/images/drawer_header_background.png'))
            // color: uniBlue,
            ),
        child: Stack(children: <Widget>[
          // Container(
          //   decoration: BoxDecoration(
          //       image: DecorationImage(
          //           fit: BoxFit.fill,
          //           image: AssetImage('lib/assets/images/logo.png'))
          //       // color: uniBlue,
          //       ),
          // ),
          Positioned(
            bottom: 35.0,
            left: 16.0,
            child: Text("Placement App",
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 20.0,
                    fontWeight: FontWeight.w500)),
          ),
          Container(
            child: Padding(
              padding: const EdgeInsets.only(top: 128, left: 15),
              child: Text('www.plax.tech',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 17.0,
                    fontWeight: FontWeight.w300,
                  )),
            ),
          ),
        ])),
  );
}

Widget _createDrawerItem(
    {IconData icon,
    String text,
    GestureTapCallback onTap,
    BuildContext context}) {
  return ListTile(
    title: Row(
      children: <Widget>[
        Icon(icon),
        Padding(
          padding: EdgeInsets.only(left: 8.0),
          child: Text(
            text,
            style: Theme.of(context).textTheme.bodyText2,
          ),
        )
      ],
    ),
    onTap: onTap,
  );
}
