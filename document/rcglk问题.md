1. 学生信息增加字段 年级 (Grade) 添加用户时也对应增加

2. 组织类别现有两个 orgClass， orgType 保留一个orgClass即可

3. 修改奖项信息接口跑不通，也许是我搞错接口了 ？ Request URL: `http://120.78.223.177/rcglk/Studentsprize/20180020`  Request Method: `PUT` Request body: `{"prizeClass":"科学技术","prizeLevel":"国家级","prizeName":"测试修改","prizeIntro":"测试1","prizeDate":"2017-2-2","prizeId":"20180020"}`    修改活动信息也一样 

4. 删除组织活动信息，返回 code 200，但未删除成功。Request URL: `http://120.78.223.177/rcglk/Studentsorg/25`  Request Method: `DELETE`

5. 新功能表：论文信息，与奖项、组织信息应有类似接口，增删查改。字段应有：`主键`、`essayTitle(论文题目)`、`essayLevel(论文级别)`、`essayAuthor(作者信息)`、`essayDate(发表日期)`、`periodical(发布期刊)`、`stuID(提交人)`,我已经写了添加，请求体如下：

   ```json
   { 
     "stuId": "2016220202004", 
     "essayTitle": "浅谈web安全", 
     "essayDate": "2018-11-23", 
     "essayLevel": "E5", 
     "periodical": "《当代计算机》", 
     "essayAuthor": [
       { "order": "第一作者", "name": "zhang" }, 
       { "order": "第二作者", "name": "tiger" },
       { "order": "第三作者", "name": "rain" }
     ]
   }
   ```

6. 批量删除时问题：请求`http://120.78.223.177/rcglk/Studentsprize/20180036-20180037`，方法是`DEELTE`，返回错误代码400

7. 关于信息中心的登录认证：由于跨域问题，需服务端设置代理请求。请求地址：`https://ostec.uestc.edu.cn/authcas/serviceValidate`，参数：`service`、`ticket`两个，客户端提供value。成功返回的话是一个xml文件，样例如下

   ```xml
   <cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>
   	<cas:authenticationSuccess>
   		<cas:user>2016220202004</cas:user>
                   
               <cas:attributes>
                   
                       <cas:lastLogin>1546329198</cas:lastLogin>
                   
                       <cas:createdBy>1107556314</cas:createdBy>
                   
                       <cas:lastUpdate>1488211200</cas:lastUpdate>
                   
                       <cas:name>王志远</cas:name>
                   
                       <cas:loginTimes>73</cas:loginTimes>
                   
                       <cas:createdTime>1474945817</cas:createdTime>
                   
                       <cas:modifiedBy>1107556314</cas:modifiedBy>
                   
                       <cas:userType>S</cas:userType>
                   
                       <cas:locked>F</cas:locked>
                   
                       <cas:userId>2016220202004</cas:userId>
                   
                       <cas:email>475254344@qq.com</cas:email>
                                     
                       <cas:currentLogin>1546329947</cas:currentLogin>
                   
               </cas:attributes>
                   
   	</cas:authenticationSuccess>
   </cas:serviceResponse>
   ```

