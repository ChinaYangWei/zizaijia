import {$,createXhr} from './util/common'
import '../common/js/nav';
import '../css/base.css';
import '../css/user.css';
// 登录
(function(){
/* 以下是封装，以便于后期维护使用,因为判断用的太多
所以封装传参以便后期使用 */
function textFail(id,value){
  document.querySelector(id).innerHTML=value;
}
function textColor_fail(id){
  document.querySelector(id).style="border-bottom:1px solid red";
}
function textColor_success(textId,value){
  document.querySelector(textId).style="border-bottom:1px solid #7adfa9";
  document.querySelector(value).innerHTML="";
}

var loginP=false;
/* 创建一个变量是手机号验证的*/
var msg=/^[1][3,4,5,7,8][0-9]{9}$/;
// 创建一个变量是验证码验证的
var esg=/^[0-9a-zA-Z]{4}$/;

// 登录界面的手机号判断
var loginPhone=document.querySelector("#login_phone");
loginPhone.onblur=()=>{
 var login_phone=loginPhone.value;
  if(login_phone==""){
    textFail("#zhPhone","手机号不能为空");
    textColor_fail("#login_phone");
    loginP=false;
  }else if(login_phone.length==11&&msg.test(login_phone)){
    textColor_success("#login_phone","#zhPhone");
    loginP=true;
  }else{
    textFail("#zhPhone","手机号格式错误");
    textColor_fail("#login_phone");
    loginP=false;
  }if(loginP){
    var xhr=createXhr();
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4&&xhr.status==200){
        var result=xhr.responseText;
        var res=JSON.parse(result);
        if(res.code==1){
          textColor_success("#login_phone","#zhPhone");
        }else{
          textFail("#zhPhone","该手机号未被注册");
          textColor_fail("#login_phone");
          loginP=false;
        }
      }
    }
    xhr.open("get","http://127.0.0.1:3000/login/login_phone?user_phone="+login_phone,true);
    xhr.send(null);
  }
}

// 登录界面的密码验证
var loginU=false;
var loginUpwd=document.querySelector("#login_upwd");
loginUpwd.onblur=()=>{
var login_upwd=loginUpwd.value;
  if(login_upwd==""){
    textFail("#zhUpwd","密码不能为空");
    textColor_fail("#login_upwd");
    loginU=false;
  }else if(/^[0-9a-zA-Z]\w{5,20}/.test(login_upwd)){
    textColor_success("#login_upwd","#zhUpwd");
    loginU=true;
  }else{
    textFail("#zhUpwd","密码必须由6-20位大小写字母,数字或下划线组成");
    textColor_fail("#login_upwd");
    loginU=false;
  }
}

// 短信登录界面的手机号和验证码验证
var messageP=false;
var messageY=false;
var loginM_b=document.querySelector("#Message");
loginM_b.onclick=()=>{
var loginM_p=document.querySelector("#loginMessage_phone").value;
var loginM_y=document.querySelector("#loginMessage_yzm").value;
  if(loginM_p==""){
    textFail("#messagePhone","手机号不能为空");
    textColor_fail("#loginMessage_phone");
    messageP=false;
  }else if(msg.test(loginM_p)){
    textColor_success("#loginMessage_phone","#messagePhone");
    messageP=true;
  }else{
    textFail("#messagePhone","手机号格式错误");
    textColor_fail("#loginMessage_phone");
    messageP=false;
  }if(loginM_y==""){
    textFail("#messageYzm","请输入验证码");
    textColor_fail("#loginMessage_yzm");
    messageY=false;
  }else if(esg.test(loginM_y)&&loginM_y.length==4){
    textColor_success("#loginMessage_yzm","#messageYzm");
    messageY=true;
  }else{
    textFail("#messageYzm","验证码格式错误,请检查");
    textColor_fail("#loginMessage_yzm");
    messageY=false;
  }
}


var login=document.querySelector("#login_button")
login.onclick=()=>{
  var login_phone=document.querySelector("#login_phone").value;
  var login_upwd=document.querySelector("#login_upwd").value;
  if(login_upwd==""){
    textFail("#zhUpwd","密码不能为空");
    textColor_fail("#login_upwd");
    loginU=false;
  }if(loginU){
    var xhr=createXhr();
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4&&xhr.status==200){
        var result=xhr.responseText;
        var res=JSON.parse(result);
        if(res.login_upwd==login_upwd){
          alert("登录成功")
        }else{
          textFail("#zhUpwd","密码错误，请重新填写");
          textColor_fail("#login_upwd");
          loginU=false;

        }
      }
    }
      xhr.open("get","http://127.0.0.1:3000/login/login_upwd?user_upwd="+login_upwd+"&user_phone="+login_phone,true);
      xhr.send(null);
  }
}


/* 查找登录顶部的两个span标签，让短信和手机号div互切 */
var span=document.querySelectorAll("#login>span");
function display(i,html,mon,id,Id){
 span[i].onclick=function(e){
  e.preventDefault();
  $(html).style.display="block";
  $(mon).style.display="none";
  $(id).style="border-bottom:2px solid rgb(94,223,154);color:#505050";
  $(Id).style="border:none;color:#bebebe";
 }
}
display(0,"login-zh","login-dx","zh","dx");
display(1,"login-dx","login-zh","dx","zh");

// 注册与登录下方的页面切换按钮
var reg=document.querySelectorAll(".Reg");
for(var key in reg){
  if(key>0){
    reg[key].onclick=function(){
      document.querySelector(".reg_top").style.display="block";
      $("reg").style.display="block";
      document.querySelector(".login_top").style.display="none";
      $("login").style.display="none";
      $("reg_phone").value="";
      $("reg_phone").focus();
      textColor_success("#reg_phone","#showPhone");
      $("reg_cpwd").value="";
      textColor_success("#reg_cpwd","#showCpwd");
      $("reg_upwd").value="";
      textColor_success("#reg_upwd","#showUpwd");
      $("reg_yzm").value="";
      textColor_success("#reg_yzm","#showYzm");
      $("reg_yzm2").value="";
      textColor_success("#reg_yzm2","#showYzm2");
    }
  }else if(key==0){
    reg[key].onclick=function(){
      document.querySelector(".reg_top").style.display="none";
      $("reg").style.display="none";
      document.querySelector(".login_top").style.display="block";
      $("login").style.display="block";
      $("login_phone").value="";
      loginPhone.focus();
      textColor_success("#login_phone","#zhPhone");
      $("login_upwd").value="";
      textColor_success("#login_upwd","#zhUpwd");
    }
  }
}
})();
// 注册
(function(){
  function textFail(id,value){
    document.querySelector(id).innerHTML=value;
  }
  function textColor_fail(id){
    document.querySelector(id).style="border-bottom:1px solid red";
  }
  function textColor_success(textId,value){
    document.querySelector(textId).style="border-bottom:1px solid #7adfa9";
    document.querySelector(value).innerHTML="";
  }
  /* 创建一个变量是手机号验证的*/
  var msg=/^[1][3,4,5,7,8][0-9]{9}$/;
  // 创建一个变量是验证码验证的
  var esg=/^[0-9a-zA-Z]{4}$/;
  
  // 手机号判断
  var regPhone=document.querySelector("#reg_phone");
  var regP=false;
  regPhone.onblur=()=>{
   var reg_phone=regPhone.value;
    if(reg_phone==""){
      textFail("#showPhone","手机号不能为空");
      textColor_fail("#reg_phone");
      regP=false;
    }else if(reg_phone.length==11&&msg.test(reg_phone)){
      textColor_success("#reg_phone","#zhPhone");
      regP=true;
    }else{
      textFail("#showPhone","手机号格式错误");
      textColor_fail("#reg_phone");
      regP=false;
    }
    if(regP){
      var xhr=createXhr();
      xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
          var result=xhr.responseText;
          var res=JSON.parse(result);
          if(res.code==0){
            textColor_success("#reg_phone","#showPhone");
            loginP=true;
          }else{
            textFail("#showPhone","该手机号已经被注册啦");
            textColor_fail("#reg_phone");
            regP=false;
          }
        }
      }
      xhr.open("get","http://127.0.0.1:3000/reg/reg_phone?user_phone="+reg_phone,true);
      xhr.send(null);
    }
  }
  
  // 输入密码判断
  var regCpwd=document.querySelector("#reg_cpwd");
  var regC=false;
  regCpwd.onblur=function(){
    var reg_cpwd=regCpwd.value;
    var reg_upwd=regUpwd.value;
    if(reg_cpwd==""){
      textFail("#showCpwd","请输入密码");
      textColor_fail("#reg_cpwd");
      regC=false;
    }else if(!/^\w{5,20}$/.test(reg_cpwd)){
      textFail("#showCpwd","密码必须由6-20位大小写字母,数字或下划线组成");
      textColor_fail("#reg_cpwd");
      regC=false;
    }else if(reg_upwd!=""&&reg_cpwd!=reg_upwd){
      textFail("#showCpwd","请输入一致密码");
      textColor_fail("#reg_upwd");
      textColor_fail("#reg_cpwd");
      regC=false;
      regU=false;
    }else if(reg_cpwd==reg_upwd){
      textColor_success("#reg_cpwd","#showCpwd");
      textColor_success("#reg_upwd","#showUpwd");
      regC=true;
      regU=true;
    }
  }
  
  // 确认密码判断
  var regU=false;
  var regUpwd=document.querySelector("#reg_upwd");
  regUpwd.onblur=function(){
    var reg_upwd=regUpwd.value;
    var reg_cpwd=regCpwd.value;
    if(reg_upwd==""){
      textFail("#showUpwd","请输入确认密码");
      textColor_fail("#reg_upwd");
    }else if(!/^\w{5,20}$/.test(reg_upwd)){
      textColor_fail("#reg_upwd");
      regU=false;
    }else if(reg_cpwd!=""&&reg_upwd!=reg_cpwd){
      textFail("#showUpwd","密码不一致");
      textColor_fail("#reg_upwd");
      textColor_fail("#reg_cpwd");
      regC=false;
      regU=false;
    }else if(reg_upwd==reg_cpwd){
      textColor_success("#reg_cpwd","#showCpwd");
      textColor_success("#reg_upwd","#showUpwd");
      regC=true;
      regU=true;
    }
  }
  
  // 图形验证码判断
  var regY=false;
  var regYzm=document.querySelector("#reg_yzm");
  regYzm.onblur=function(){
  var reg_yzm=regYzm.value;
    if(reg_yzm==""){
      textFail("#showYzm","请输入验证码");
      textColor_fail("#reg_yzm");
      regY=false;
    }else if(esg.test(reg_yzm)&&reg_yzm.length==4){
      textColor_success("#reg_yzm","#showYzm");
      regY=true;
    }else{
      textFail("#showYzm","验证码错误");
      textColor_fail("#reg_yzm");
      regY=false;
    }
  }
  
  // 验证码判断
  var regY2=false;
  var regYzm2=document.querySelector("#reg_yzm2");
  regYzm2.onblur=function(){
  var reg_yzm2=regYzm2.value;
    if(reg_yzm2==""){
      textFail("#showYzm2","请输入验证码");
      textColor_fail("#reg_yzm2");
      regY2=false;
    }else if(esg.test(reg_yzm2)&&reg_yzm2.length==4){
      textColor_success("#reg_yzm2","#showYzm2");
      regY2=true;
    }else{
      textFail("#showYzm2","验证码错误");
      textColor_fail("#reg_yzm2");
      regY2=false;
    }
  }
  
  
  // 注册按钮
  var reg=document.querySelector("#REG");
  reg.onclick=function(){
  // checked的判断
  var check=document.querySelector(".reg_top>#reg>.protocol>input:first-child");
    if(check.checked==true){
      document.querySelector(".reg_top>div:first-child").className="checked"
      if(regP==true&&regU==true&&regC==true&&regY==true&&regY2==true){
      var xhr=createXhr();
      xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
          var result=xhr.responseText;
          var res=JSON.parse(result);
          if(res.code==1){
            alert("注册成功");
            location.href="http://127.0.0.1:3000/dist/pages/index.html";
          }
        }
      }
      xhr.open("post","http://127.0.0.1:3000/reg/Reg",true);
      xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      var formData="user_phone="+regPhone.value+"&user_upwd="+regUpwd.value;
      xhr.send(formData);
      }else{
      alert("请认真填写注册信息");
      }
    }else{
      document.querySelector(".reg_top>.checked").className="not-checked"
    }
  }
  })();