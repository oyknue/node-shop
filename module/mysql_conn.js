const mysql = require('mysql');
const option = {
  host: 'localhost', //같은 서버에 있는 마이에스큐엘
  user: 'oyknue', //이 사용자의
  password: '000000', // 이 패스워드로
  port: 3306, //mysql 지정
  database: 'oyknue', // 이 데이터 베이스에
  connectionLimit: 10 //10개의 커넥션 객체
};
const conn = mysql.createPool(option); 

//나를 부르는 놈에게 모듈을 추출해줄게 
module.exports = {
  mysql: mysql, // mysql이란 변수에 마이에스큐엘 담음
  conn: conn //conn이라는 변수에 conn담음 
};