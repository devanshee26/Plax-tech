import 'package:flutter/material.dart';
import 'package:uniplacement/assets/color.dart';
import 'package:uniplacement/assets/cut_corner_button.dart';
import 'package:uniplacement/assets/liscense.dart';
import 'package:uniplacement/module/add_on/about_us/about_us_view.dart';
import 'package:uniplacement/module/add_on/author/author_view.dart';
import 'package:uniplacement/module/add_on/feedback/feedback_view.dart';
import 'package:uniplacement/module/add_on/home/home_page.dart';
import 'package:uniplacement/module/major/blog/blog_detail_view.dart';
import 'package:uniplacement/module/major/blog/blog_view.dart';
import 'package:uniplacement/module/major/competitive_coding/coding_questions.dart';
import 'package:uniplacement/module/major/competitive_coding/coding_view.dart';
import 'package:uniplacement/module/major/placement/off_campus.dart';
import 'package:uniplacement/module/major/placement/past_record.dart';
import 'package:uniplacement/module/major/placement/placement_view.dart';
import 'package:uniplacement/module/major/placement/prediction.dart';
import 'package:uniplacement/module/major/quiz/quiz_view.dart';
import 'package:uniplacement/module/add_on/splash_screen.dart';
// import 'package:uniplacement/oss_licenses.dart';

import 'package:uniplacement/routes/routes.dart';
import 'package:flutter/widgets.dart';

int main() {
  //Injector.configure(Flavor.PRO);

  runApp(new MaterialApp(
    debugShowCheckedModeBanner: false,
    title: 'Plax',
    theme: _buildUniTheme(),
    home: SplashScreen(),
    routes: {
      Routes.blog: (context) => BlogPage(),
      Routes.author: (context) => AuthorPage(),
      Routes.quiz: (context) => Quiz(),
      Routes.placement: (context) => PlacementPage(),
      Routes.offcampus: (context) => OffCampusPage(),
      Routes.coding: (context) => CodingPage(),
      Routes.feedback: (context) => FeedbackPage(),
      Routes.blogdetail: (context) => BlogDetailPage(),
      Routes.pastrecord: (context) => PastPage(),
      Routes.prediction: (context) => PredictionPage(),
      Routes.aboutus: (context) => AboutUsPage(),
      Routes.license: (context) => OssLicensesPage(),
      Routes.home: (context) => HomePage(),
      Routes.codingquestions: (context) => CodingQuestionsPage(),
    },
  ));
  return 0;
}

ThemeData _buildUniTheme() {
  final ThemeData base = ThemeData.light();
  return base.copyWith(
    accentColor: uniGray,
    primaryColor: uniBlue,
    scaffoldBackgroundColor: uniBackground,
    cardColor: uniBackgroundWhite,
    textSelectionColor: uniGray,
    errorColor: uniErrorRed,
    buttonTheme: base.buttonTheme.copyWith(
      buttonColor: uniPink10,
      colorScheme: base.colorScheme.copyWith(
        secondary: uniGray,
      ),
    ),
    buttonBarTheme: base.buttonBarTheme.copyWith(
      buttonTextTheme: ButtonTextTheme.accent,
    ),
    primaryIconTheme: base.iconTheme.copyWith(color: uniGray),
    inputDecorationTheme: InputDecorationTheme(
      border: CutCornersBorder(),
    ),
    textTheme: _buildUniTextTheme(base.textTheme),
    primaryTextTheme: _buildUniTextTheme(base.primaryTextTheme),
    accentTextTheme: _buildUniTextTheme(base.accentTextTheme),
    // iconTheme: _customIconTheme(base.iconTheme),
  );
}

// IconThemeData _customIconTheme(IconThemeData original) {
//   return original;
// }

TextTheme _buildUniTextTheme(TextTheme base) {
  return base
      .copyWith(
        headline5: base.headline5.copyWith(
          fontWeight: FontWeight.w400,
          letterSpacing: 3,
          fontSize: 17,
          color: uniTextColor,
        ),
        headline6: base.headline6.copyWith(fontSize: 18.0),
        caption: base.caption.copyWith(
          fontWeight: FontWeight.w400,
          fontSize: 14.0,
        ),
        bodyText1: base.bodyText1.copyWith(
          // fontWeight: FontWeight.w1000,
          color: uniQuizQuestionStatus,
          fontSize: 16.0,
        ),
        bodyText2: base.bodyText2.copyWith(
          fontWeight: FontWeight.w800,
          fontSize: 17.0,
          color: uniBlue,
        ),
        headline1: base.headline1.copyWith(
          fontSize: 20.0,
          color: uniViolet,
        ),
        headline4: base.headline2.copyWith(
          fontWeight: FontWeight.w400,
          letterSpacing: 3,
          fontSize: 17,
          color: uniViolet,
        ),
      )
      .apply(
        // displayColor: uniGray,
        // bodyColor: uniGray,
        fontFamily: 'ProductSans',
      );
}
