<template>
  <div class="hello" style="padding-top:50px;">
   
   
      
       
       <Input  placeholder="邮箱 " v-model="email">
          <Icon type="md-mail" slot="prefix" />
        </Input>
        <div style="margin-bottom: 10px;"></div>
        <Input  placeholder="充值金额 " v-model="money">
          <Icon type="logo-yen" slot="prefix" />
        </Input>
        <div style="margin-bottom: 30px;"></div>
        <Button  @click="recharge" type='success' size='large' long>确认充值</Button>

        <!--统计部分-->
        <Tabs value="name1">
            
            <!--使用记录统计-->
            <TabPane label="标签一" name="name1">
                <Table :columns="columns1" :data="data1"></Table>
            </TabPane>
            
            <!--用户总使用量统计-->
            <TabPane label="标签二" name="name2">
              
                <Table :columns="userInvokedColumn" :data="userInvoked"></Table>

            </TabPane>
            <TabPane label="标签三" name="name3">
              
                <Table :columns="userInviteColumn" :data="userInvited"></Table>

            </TabPane>
        </Tabs>
        



  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
        api : 'http://test.51koutu.com:4000' ,

        email : '' ,//邮箱
        money : 10 //金额

        ,columns1: [
                    {
                        title: 'email',
                        key: 'email'
                    },
                    {
                        title: 'amount',
                        key: 'amount'
                    },
                    {
                        title: 'time',
                        key: 'time'
                    }
                ]

        ,data1: []

        ,userInvokedColumn:[{title:'email' , key:'email'},{title:'使用总数',key:'invokedAmount'},{title:'总数',key:'totalAmount'}]
        ,userInvoked:[]

        //邀请统计
        ,userInviteColumn:[{title:'email' , key:'email'},{title:'邀请总数',key:'total'}]
        ,userInvited:[]



    }   
  },

  created(){

      this.getKouTuBehavior(); //获取每天使用记录
      this.getUserInvoked(); //获取用户使用次数
      this.getUserInvite(); //获取用户邀请记录

  },

  methods:{

    //充值
    recharge(){

      if( this.email && this.money )
      {
        console.log( 'email' ,this.email , 'money' ,this.money );

        this.$axios.post(this.api+'/recharge' , {email:this.email,money:this.money} )
        .then( res=>{
          console.log( res );
            if( 0 == res.data.status )
            {
              this.$Message.success({content : "充值成功"})
            }
            else if( 1 == res.data.status )
            {
              
              this.$Message.error({content : "用户不存在"})
            }
        } )
        .catch( err=>{
          console.log("充值失败" , err);
          this.$Message.error({content : '充值失败 '});
        } );
      }
      else
      {
        this.$Message.info({content : '请输入正确的邮箱和金额'});
      }

    }

    //获取抠图行为数据
    ,getKouTuBehavior(){

          Date.prototype.Format = function (fmt) {
              var o = {
                  "M+": this.getMonth() + 1, //月份 
                  "d+": this.getDate(), //日 
                  "H+": this.getHours(), //小时 
                  "m+": this.getMinutes(), //分 
                  "s+": this.getSeconds(), //秒 
                  "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                  "S": this.getMilliseconds() //毫秒 
              };
              if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
              for (var k in o)
              if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
              return fmt;
          }
          //获取抠图行为数据
          this.$axios.get( this.api+'/getKouTuBehavior' )
          .then( res=>{
              // console.log( res );
              if( 0 == res.data.status )
              {
                this.data1 = res.data.results;
                // console.log('this.data1' , this.data1);
                for(let i in this.data1)
                {
                  this.data1[i]['time'] = (new Date(this.data1[i]['time'])).Format( 'yyyy-MM-dd HH:mm:ss'  );
                }
                // console.log( this.data1 );
              }
              else
              {
                console.log("获取失败");
              }
          } )
          .catch( err=>{

              console.log(err);

          } );


    }

    //获取用户使用次数和总次数
    ,getUserInvoked(){

          this.$axios.get(this.api+'/getUserInvoked')
          .then( res=>{
            console.log('res',res);
            if(  0 == res.data.status)
            {
              console.log( res.data.result );
              this.userInvoked = res.data.result;
            }
          } )
          .catch(err=>{
            console.log( err );
          });


    }

    //获取用户邀请数
    ,getUserInvite(){

          this.$axios.get(this.api+'/getUserInvite')
          .then( res=>{
            console.log('res',res);
            if(  0 == res.data.status)
            {
              console.log( res.data.result );
              this.userInvited = res.data.result;
            }
          } )
          .catch(err=>{
            console.log( err );
          });


    }

  }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  /*margin: 0 10px;*/
}
a {
  /*color: #42b983;*/
}
</style>
