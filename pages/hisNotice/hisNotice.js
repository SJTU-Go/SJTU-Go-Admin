// pages/hisNotice/hisNotice.js
function json2Form(json) { 
  var str = []; 
  for(var p in json){ 
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p])); 
  } 
  return str.join("&"); 
} 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    custate:0,
    admin:'',
    adminID:1,
    hislist:{},
    hisNotice:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'admin',
      success:function(res){
        console.log(res.data)
        that.setData({admin:res.data})
        
      }
    })
    wx.getStorage({
      key: 'adminID',
      success:function(res){
        console.log(res.data)
        that.setData({adminID:res.data})
        
      }
    })
    wx.request({
      url: 'https://api.ltzhou.com/notice/request',
      method:'POST',
      header: {
      'content-type': 'application/x-www-form-urlencoded'
      },
     
  
     success (res){
      console.log(res)
      var mm= new Array();
      var count=0;
      
      for (var i in res.data){
        if  (res.data[i].publisherID==that.data.adminID){
          mm[count]=res.data[i]
          count+=1
        }
      }
      console.log(mm)
      if(mm.length==0){
        that.setData({custate:1})
      }
      else{
        that.setData({custate:0})
      }
      var tr=new Array()
      var cccc=0
      for( var i=mm.length-1;i>=0;--i){
        tr[cccc]=mm[i]
        cccc+=1
      }
      that.setData({hisNotice :tr})
      
      
      
    }
       
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})