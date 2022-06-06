$(function () {
    let layer = layui.layer
 // 1.1 获取裁剪区域的 DOM 元素
 var $image = $('#image')
 // 1.2 配置选项
 const options = {
   // 纵横比
   aspectRatio: 1,
   // 指定预览区域
   preview: '.img-preview'
 }
 // 1.3 创建裁剪区域
 $image.cropper(options)

// 为文件上传框绑定点击事件
  $('#uploadBtn').on('click', function () {
      $('#file').click()
  })

//   为文件选择框绑定 change 事件
$('#file').on('change', function (e) {
    // console.log(e)
  let FileList = e.target.files
  if (FileList.length === 0) {
      return layer.msg('请选择照片！')
  }
  let file = FileList[0]
  let imurl = URL.createObjectURL(file)
  $('#image').cropper('destroy').attr('src', imurl).cropper(options)

//   为确定按钮绑定点击事件
$('#surebtn').on('click', function () {
    var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    console.log(dataURL)
    $.ajax({
        method: 'post',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function (res) {
            if (res.status !== 0){
                return layer.msg('更新头像失败！')
            }
            layer.msg('更新头像成功！')
            console.log(res)
            window.parent.getUserInfo()

        }
    })
})


})





  })
 



