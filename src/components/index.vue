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

        <Table :columns="columns1" :data="data1"></Table>



  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
        api : 'http://51koutu.com:3000' ,

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

        ,data1: [
                    {
                        email: 'John Brown',
                        amount: 18,
                        time: '2016-10-03'
                    },
                    {
                        email: 'Jim Green',
                        amount: 24,
                        time: '2016-10-01'
                    },
                   
                ]



    }   
  },

  created(){

    //获取抠图行为数据
    this.$axios.get( this.api+'/getKouTuBehavior' )
    .then( res=>{
        console.log( res );
        if( 0 == res.data.status )
        {
          this.data1 = res.data.results;
        }
        else
        {
          console.log("获取失败");
        }
    } )
    .catch( err=>{

        console.log(error);

    } );

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
