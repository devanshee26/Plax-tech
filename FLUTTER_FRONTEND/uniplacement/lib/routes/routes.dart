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

class Routes {
  static const String author = AuthorPage.routeName;

  static String quiz = Quiz.routeName;

//Added Today😁

  static const String coding = CodingPage.routeName;

  //added again
  static const String feedback = FeedbackPage.routeName;
  static const String blog = BlogPage.routeName;
  static const String blogdetail = BlogDetailPage.routeName;

//added edited.😋
  static const String placement = PlacementPage.routeName;
  static const String pastrecord = PastPage.routeName;
  static const String offcampus = OffCampusPage.routeName;
  static const String prediction = PredictionPage.routeName;

  static const String aboutus = AboutUsPage.routeName;
  static const String license = OssLicensesPage.routeName;
  static const String home = HomePage.routeName;
  static const String codingquestions = CodingQuestionsPage.routeName;
}
