const port = 8001; // 카페24 node hosting port
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //포스트 방식의 모듈에 접근(파싱) 
const db = require('./module/mysql_conn'); //내 위치(root)에 있는 모듈에 있는 mysql_conn에 연결 
const conn = db.conn; // 전달받은 conn을 넣어야함.

app.listen(port, ()=>{
  console.log("connected at "+port);
});

//초기설정
app.locals.pretty = true;
app.set('view engine', 'pug'); //view 엔진 설정
app.set('views', './views'); 
app.use(bodyParser.urlencoded({ extended: false })); // ??
app.use('/', express.static('./public')); //루트를 치면 정적폴더를 지정하겟습니다.

//router
app.post('/admin/:method', (req, res) => {
  var method = req.params.method;  //login
  var uid = req.body.uid;          //admin
  var upw = req.body.upw;          //111111
  switch(method){
    case "login":
      //데이터베이스 접근
      conn.getConnection((err, connect) => {
        if(err){
          connect.release(); //에러가 났든 정상접근을 했든 다시 돌려줌 
          res.send('<h5>SQL Connection Error!</h5>');
        }
        else{
          var sql = ` SELECT uid FROM admin WHERE uid='${uid}' AND upw='${upw}' `;
					connect.query(sql, (err, result) => {
						if(err) {
							connect.release(); 
							res.send('<h5>SQL Query Error!</h5>');
						}
						else {
							connect.release(); //conn객체에게 다시 열쇠를 돌려주는 셈
							if(result[0]){
                res.redirect("/admin/cate_top1.html");
              } //result 0번 존재하면 관리자 존재하지 않으면 관리자 아님(else)
              else{
                vals = {
                  alertMsg : "아이디와 패스워드를 확인해주세요.",
                  locURL : "/admin/login.html"
                };
                res.render('alert', vals);
              }
						}
					});
				}
			});
      break;
    default:
      res.send("ERROR! 정상적인 접근이 아닙니다.");
      break;
  }
});

// Ajax 요청 관리
/*
/ajax/cate/:top,left/:c,r,u,d
/ajax/cate_sub/:num/:c,r,u,d
/ajax/ban/:c,r,u,d
/ajax/prd/:c,r,u,d
*/
app.get('/ajax/cate/:method/:chk', (req, res) => {
	var method = req.params.method;
	var chk = req.params.chk;
	switch(method) {
		case "top":
			switch(chk) {
				case "c":
					break;
				case "r":
					res.send("정상");
					break;
				case "u":
					break;
				case "d":
					break;
				default:
					res.send("ERROR! 정상적인 접근이 아닙니다.");
					break;
			}
			break;
		default:
			res.send("ERROR! 정상적인 접근이 아닙니다.");
			break;
	}
});