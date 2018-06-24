
var http = require('http');

var fs = require('fs');

var path = require('path');

var globalSQL = "hello!";
//C: /Users/Admin / DocumentsGitHub / vidserver / vidServer / nodeNET / edge / lib / edge
var edge = require('./nodeNET/edge/lib/edge'); //this uses a custom build for this node version. 


var app = require('express');


var gittest = "hello git    ";

//  var exp = require('express');
var cluster = require('cluster');

//youtube 
var ytdl = require('ytdl-core');


///Note dont use try blocks in these 

var ExecuteCommandSync = edge.func(function () {
    /*
     async (input) =>{
    
string output = "";
        
                // create the ProcessStartInfo using "cmd" as the program to be run,
                // and "/c " as the parameters.
                // Incidentally, /c tells cmd that we want it to execute the command that follows,
                // and then exit.
                System.Diagnostics.ProcessStartInfo procStartInfo =
                    new System.Diagnostics.ProcessStartInfo("cmd", "/c " + input);

                // The following commands are needed to redirect the standard output.
                // This means that it will be redirected to the Process.StandardOutput StreamReader.
                procStartInfo.RedirectStandardOutput = true;
                procStartInfo.UseShellExecute = false;
                // Do not create the black window.
                procStartInfo.CreateNoWindow = true;
                // Now we create a process, assign its ProcessStartInfo and start it
                System.Diagnostics.Process proc = new System.Diagnostics.Process();
                proc.StartInfo = procStartInfo;
                proc.Start();

                // Get the output into a string
                string result = proc.StandardOutput.ReadToEnd();
                output = result;
                // Display the command output.
                output  = result; 
                return result ;
         
            return output;
      }*/
});

/*
 ExecuteCommandSync(
    "node ytdl -o " +
    "songname" +
    "www.youtube.com/watch?v=jNQXAC9IVRw"
    + " audioonly", function(error, result) {
    if (error) throw error;
    console.log(result);
});

*/



    http.createServer(function (req, res) {
        // res.writeHead(200, 'Content-Type');
        

        var filePath = path.join(__dirname, "myfile.mp3");

        var songFilesPath = "C:\\Users\\Admin\\Desktop\\youtubeVidyabot\\youtubeVidyabot\\bin\\Debug\\mp3s";

        //login, request user id from server. 
        if (req.url.includes("login")) {
            var urldata = req.url;
            var parts = urldata.split("&");
            var uname = parts[1];
            var pw = parts[2];
            uname = uname.split("=").pop(); //trim everything before the = sign 
            pw = pw.split("=").pop(); //trim everything before the = sign 

            //now they just contain data. 

            //look up some db stuff in here or something MAKE SURE UNAME AND PW ARE VALID LOL 

            //finally send a user_name (for the pw and uname combo :)
            res.write("leo_", function (err) {
                res.end();
            });



        } else {

            //first requets - user requests to see if any songs have been downloaded for them. FIRST 
            if (req.url.includes("check")) {
                //SECOND 
                //get data from url about user
                //check their song list on file. 
                var urldata = req.url;
                var parts = urldata.split("&");
                var uid = parts[1];

                fs.readFile(uid + ".txt", "utf8", function (err, data) {

                    //there should just be 1 number 
                    res.write(data);                //again for the username and password combo or userid 
                    res.end();
                    fs.writeFile(uid + ".txt", "0", function (err) {

                    });
                });


                //THIRD
                //send song ids or 0 response if there are no songs for the user 
            } else {

                //FOURTH 
                //user requests for a song, check if it exists and send it to them else nothing 
                if (req.url.includes("some_songID")) {
                    //FIFTH 
                    //read the song from the file and pipe it to the user if it exists , so nor swlwrw ir. 

                } else {

                    if (req.url.includes("getsonglist")) {//send the user their song list from the file 
                        var urldata = req.url;
                        var parts = urldata.split("&");
                        var uid = "";
                        try {
                            uid = parts[1];
                        } catch (e) {

                        }

                        if (uid != "") {
                            var songListPath = path.join(__dirname, "songlists", uid + ".txt");


                            fs.readFile(songListPath, "utf8", function (err, data) {
                                if (typeof data != 'undefined') {

                                    if (data.length > 1) {
                                        res.write(data, function (err) {
                                            res.end();
                                        });



                                    }
                                } else {
                                    res.write("NO_NEW_SONGS", function (err) {
                                        res.end();
                                    });
                                }
                            });
                        }



                    } else {

                        if (req.url.includes("gotsongs_OK")) {//response code from the client meaning songlist is received, once this is ok, delete their songlist 
                            var urldata = req.url;
                            var parts = urldata.split("&");
                            var uid = parts[1];

                            var songlists_path = path.join(__dirname, "songlists", uid + ".txt");

                            fs.unlink(songlists_path, function (err) {
                                if (err) {

                                }
                            });
                            res.write("ok", function (err) {
                                res.end();
                            });


                        } else {


                            if (req.url.includes("read")) {                         //this could be data about what songs are new or the total song list. 
                                fs.readFile("fname.txt", "utf8", function (err, data) {
                                    //lets say this file contains some text data needed to send stuff to the user just try reading it 
                                    var splitdata = data.split(';');

                                    //res.writeHead(200, { 'Content-Type': 'text/html' });
                                    //res.setHeader("content-type", "some/type");

                                    for (var i = 0; i < splitdata.length; i++) {
                                        //res.write(splitdata[i]);
                                        //the url will also contain the song name since the client has already obtained a song list. 
                                        fs.createReadStream(filePath).pipe(res);
                                    }


                                    res.end();
                                });
                            } else {


                                if (req.url.includes("getsongs")) {             //in this case here getsongs is an indicator of a particular song, since songs wont be deleted, just downloaded this can be reused. 
                                    var urldata = req.url;
                                    var parts = urldata.split("&");
                                    var songname = parts[1];

                                    //!!! addd a check to see if the songname is empty !!! like "" 

                                    songname = decodeURI(songname); //remove the html encoding. 
                                    songname = songname.replace('+', ' ');
                                    //  var songPath = songFilesPath + "\\" + songname + ".mp3";
                                    var songPath = path.join("C:\\Users\\Admin\\Documents\\GitHub\\ytmusicdl\\youtubeVidyabot\\bin\\Debug\\mp3s", songname + ".mp3");     //notice here that the song has to be in the same directory as the server, otherwise it cant read it or something 

                                    res.writeHead(200, {
                                        'Content-Type': 'audio/mpeg',
                                        'Content-Length': 343434343,
                                        'Content-Disposition': 'attachment; filename=' + songname + '.mp3' //replace yourfilename with song name. 
                                    });

                                    //res.setHeader("content-type", "some/type"); //the url will also contain the song name since the client has already obtained a song list. 

                                    fs.createReadStream(songPath).pipe(res);


                                    //        res.setHeader('Content-Disposition', 'filename="'+songname + '".mp3"');
                                } else {
                                    // next(); // not our concern, pass along to next middleware function


                                    if (req.url.includes("website")) {
                                        fs.readFile("index.html", "utf8", function (err, data) {
                                            //res.writeHead(200, { 'Content-Type': 'text/html' });
                                            res.write(data, function (err) {
                                                res.end();
                                            });
                                        });


                                    } else {

                                        if (req.url.includes("/requestDL")) { ///requestDL&soneLink&uid(leo_) 
                                            var urldata = req.url;
                                            var parts = urldata.split("&");
                                            var songid = parts[1];
                                            var uid = parts[2];

                                            fs.appendFile("songRequests" + "_" + uid + ".txt", ";" + songid, function (err) {

                                            });
                                            res.end();

                                        } else {

                                            if (req.url.includes("request_download")) {
                                                var urldata = req.url;
                                                var parts = urldata.split("&");
                                                var songurl = "";
                                                var songname = "";

                                                try {
                                                    songurl = parts[2];
                                                    songname = parts[3];
                                                } catch (e) {
                                                    console.log(e);

                                                }

                                                var location = path.join(__dirname, "song_request", parts[1] + ".txt");
                                                songname = decodeURI(songname);

                                                fs.appendFile(location, songurl + ";" + songname + "|", function (err) {

                                                });
                                                res.write("okk", function (err) {

                                                    res.end();
                                                });


                                            } else if (req.url.includes("getcss_slideshow")) {
                                                try {
                                                    fs.readFile("C:\\Users\\Admin\\Desktop\\web_gallery_assets\\jquery_slideshow\\css\\style.css",
                                                        function (err, data) {
                                                            res.write(data, function (error) {
                                                                res.end();
                                                            });
                                                        });
                                                } catch (err) {
                                                    console.log(err);
                                                }

                                            } else if (req.url.includes("getjs_slideshow")) {
                                                try {
                                                    fs.readFile("C:\\Users\\Admin\\Desktop\\web_gallery_assets\\jquery_slideshow\\js\\index.js",
                                                        function (err, data) {
                                                            res.write(data, function (error) {
                                                                res.end();
                                                            });
                                                        });
                                                } catch (err) {
                                                    console.log(err);
                                                }

                                            } else if (req.url.includes("getcss_base")) {
                                                try {
                                                    fs.readFile("C:\\Users\\Admin\\Desktop\\web_gallery_assets\\css_base_daniela.css",
                                                        function (err, data) {
                                                            res.write(data, function (error) {
                                                                res.end();
                                                            });
                                                        });
                                                } catch (err) {
                                                    console.log(err);
                                                }

                                            } else 
                                            {
                                                
                                                //index 
                                                var ip = req.connection.remoteAddress.toString();
                                                fs.readFile("index.html", "utf8", function (err, data) {
                                                    //res.writeHead(200, { 'Content-Type': 'text/html' });

                                                    res.write(ip, function (err) {
                                                        res.end();
                                                    });

                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //res.end(); dont use this it messes up responses. 

    }).listen(1337);


































