import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:uniplacement/module/add_on/drawer/drawer.dart';
import 'package:html2md/html2md.dart' as html2md;
import 'package:flutter_markdown/flutter_markdown.dart';

class BlogPage extends StatelessWidget {
  static const String routeName = '/blog';
  Future<List<Posts>> posts;
  final String url = 'https://api.plax.tech/blog/get';

  @override
  Widget build(BuildContext context) {
    posts = parsePosts();
    return new Scaffold(
        appBar: AppBar(
          title: Text("Blog page"),
        ),
        drawer: AppDrawer(),
        body: Center(
          child: FutureBuilder<List<Posts>>(
            future: posts,
            builder: (context, snapshot) {
              if (snapshot.hasError) print(snapshot.error);
              return snapshot.hasData
                  ? PostList(posts: snapshot.data)
                  : Center(child: CircularProgressIndicator());
            },
          ),
        ));
  }

  Future<List<Posts>> parsePosts() async {
    final response = await http.get(url);
    final responseBody = response.body;
    final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();

    return parsed.map<Posts>((json) => Posts.fromJson(json)).toList();
  }
}

class PostList extends StatelessWidget {
  final List<Posts> posts;

  PostList({Key key, this.posts});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: posts.length,
      itemBuilder: (context, index) {
        return Container(
          margin: EdgeInsets.all(8.0),
          child: GestureDetector(
            child: Card(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(Radius.circular(8.0))),
              child: InkWell(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: <Widget>[
                    ClipRRect(
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(8.0),
                        topRight: Radius.circular(8.0),
                      ),
                      child: Image.network(
                        posts[index].imagePath,
                        height: 200,
                        fit: BoxFit.fill,
                      ),
                    ),
                    ListTile(
                      title: Text(posts[index].title),
                      subtitle: Text(posts[index].author),
                    ),
                  ],
                ),
              ),
            ),
            onTap: () {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) =>
                          DetailedArticle(posts: posts[index])));
            },
          ),
        );
      },
    );
  }
}

class Posts {
  final String id, title, author, imagePath, date, content;
  final List<Comment> comments;

  Posts(
      {this.id,
      this.title,
      this.author,
      this.imagePath,
      this.date,
      this.content,
      this.comments});

  factory Posts.fromJson(Map json) {
    Comment comment;
    List<Comment> temporaryList = <Comment>[];
    for (int i = 0; i < json['comments'].length; i++) {
      comment = Comment.fromJson(json['comments'][i]);
      temporaryList.add(comment);
    }
    return Posts(
        id: json['_id'],
        title: json['title'],
        author: json['author'],
        imagePath: json['imagePath'],
        date: json['date'],
        content: json['content'],
        comments: temporaryList);
  }
}

class Comment {
  final String author, date, content;

  Comment({this.author, this.date, this.content});

  factory Comment.fromJson(Map json) {
    return Comment(
        author: json['author'], date: json['date'], content: json['content']);
  }
}

class DetailedArticle extends StatelessWidget {
  final Posts posts;

  DetailedArticle({this.posts});

  @override
  Widget build(BuildContext context) {
    String markdown = html2md.convert(posts.content);
    return new Scaffold(
        appBar: AppBar(
          title: Text(posts.title),
        ),
        drawer: AppDrawer(),
        body: SingleChildScrollView(
          child: Container(
            margin: EdgeInsets.all(8.0),
            child: Card(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(Radius.circular(8.0))),
              child: InkWell(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: <Widget>[
                      ListTile(
                        title: new Center(
                            child: new Text(posts.title,
                                style: TextStyle(fontSize: 24))),
                        subtitle: new Center(
                            child: new Text(
                                "By: " +
                                    posts.author +
                                    " on " +
                                    posts.date.substring(0, 10),
                                style: TextStyle(fontSize: 12))),
                      ),
                      ClipRRect(
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(8.0),
                          topRight: Radius.circular(8.0),
                        ),
                        child: Image.network(
                          posts.imagePath,
                          height: 200,
                          fit: BoxFit.fill,
                        ),
                      ),
                      Padding(
                          padding: EdgeInsets.fromLTRB(16, 16, 16, 16),
                          child: new MarkdownBody(
                            data: markdown,
                          )),
                      Padding(
                          padding: EdgeInsets.fromLTRB(16, 0, 16, 16),
                          child: Text("Comments: ",
                              style: TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.w400))),
                      new SizedBox(
                        height: 200.0,
                        child: new ListView.builder(
                            scrollDirection: Axis.vertical,
                            itemCount: posts.comments.length,
                            itemBuilder: (context, index) {
                              return Container(
                                  color: index % 2 == 0
                                      ? Colors.black12
                                      : Colors.transparent,
                                  child: ListTile(
                                    title: Text(posts.comments[index].content,
                                        style: TextStyle(
                                            fontSize: 12,
                                            fontWeight: FontWeight.w400),
                                        textAlign: TextAlign.left),
                                    subtitle: Text(
                                      "By " +
                                          posts.comments[index].author +
                                          " on " +
                                          posts.comments[index].date
                                              .substring(0, 10),
                                      style: TextStyle(
                                          fontSize: 12,
                                          fontWeight: FontWeight.w400),
                                      textAlign: TextAlign.right,
                                    ),
                                  ));
                            }),
                      )
                    ]),
              ),
            ),
          ),
        ));
  }
}
