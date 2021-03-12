import 'package:flutter/material.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';
import 'package:uniplacement/assets/color.dart';
import 'package:uniplacement/module/add_on/drawer/drawer.dart';
// import 'package:uniplacement/module/drawer/drawer.dart';
// import 'package:uniplacement/widgets/drawer.dart';

class AuthorPage extends StatelessWidget {
  static const String routeName = '/author';

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: AppBar(
          title: Text("Developers"),
        ),
        drawer: AppDrawer(),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(30.0),
            child: ListView(
              children: <Widget>[
                makeCard(
                    context,
                    "Devanshee Vankani",
                    'lib/assets/images/author/Devanshee.jpg',
                    "Cloud | Flutter"),
                SizedBox(
                  height: 20,
                ),
                makeCard(context, "Sahil Bhuva",
                    'lib/assets/images/author/Sahil.jpeg', 'AWS | GCP'),
              ],
            ),
          ),
        ));
  }

  Widget makeCard(
      BuildContext context, String name, String profile, String tech) {
    return Container(
      child: Card(
        elevation: 10,
        color: uniAuthorCard,
        child: Container(
          decoration: BoxDecoration(
              gradient: LinearGradient(
                  begin: Alignment.topRight,
                  end: Alignment.bottomLeft,
                  colors: [uniAuthCard2, uniAuthorCard])),
          width: MediaQuery.of(context).size.width * 3 / 4,
          height: MediaQuery.of(context).size.height * 1 / 2,
          child: Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.all(12.0),
                child: CircleAvatar(
                  radius: 50,
                  backgroundColor: Colors.white,
                  child: CircleAvatar(
                    // backgroundColor: Colors.black,
                    backgroundImage: AssetImage(profile),
                    radius: 47,
                  ),
                ),
              ),
              Text(name,
                  style: TextStyle(
                    fontFamily: 'ProductSans-Bold',
                    fontSize: 28,
                    color: Colors.white,
                    letterSpacing: 2,
                    fontWeight: FontWeight.bold,
                  )),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  tech,
                  style: TextStyle(
                      fontFamily: '',
                      color: Color(0xFFbce6eb),
                      fontWeight: FontWeight.w400,
                      fontSize: 20),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(15.0),
                child: Text(
                  "Works on various technology. Experience of 4 years in web development.",
                  style: TextStyle(
                    fontFamily: 'Century',
                    fontSize: 18,
                    color: Colors.white60,
                    fontWeight: FontWeight.w500,
                    fontStyle: FontStyle.italic,
                    letterSpacing: 1.5,
                  ),
                ),
              ),
              SizedBox(
                height: 30,
              ),
              Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.only(left: 20.0),
                    child: Container(
                      color: uniBackground,
                      child: SignInButton(
                        Buttons.Facebook,
                        mini: true,
                        onPressed: () {},
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 20.0),
                    child: Container(
                      color: uniBackground,
                      child: SignInButton(
                        Buttons.LinkedIn,
                        mini: true,
                        onPressed: () {},
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 20.0),
                    child: Container(
                      color: uniBackground,
                      child: SignInButton(
                        Buttons.GitHub,
                        mini: true,
                        onPressed: () {},
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 20.0),
                    child: Container(
                      color: uniBackground,
                      child: SignInButton(
                        Buttons.Twitter,
                        mini: true,
                        onPressed: () {},
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
