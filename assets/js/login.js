$(function () {
  // 点击去注册
  $('#link_reg').on('click', function () {
    $('.login_box').hide()
    $('.reg_box').show()
  })

  // 点击去登录
  $('#link_login').on('click', function () {
    $('.login_box').show()
    $('.reg_box').hide()
  })

  // 从 layui 中获取 form 对象
  var form = layui.form
  var layer = layui.layer

  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    //   自定义了一个pwd的校验规则
    pwd: [/^\S{6,12}$/, '密码必须6-12位，且不能出现空格'],
    repwd: function (value) {
      //通过形参拿到的是确认密码框中的内容
      //还需要拿到密码框中的内容
      //然后进行一次等于判断
      //如果判断失败 则return一个提示消息即可
      var pwd = $('.reg_box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })
  //   监听注册form表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 阻止默认的提交行为
    e.preventDefault()
    // 发起Ajax的post请求
    var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功请登录')
      //   click主动点击事件
      $('#link_login').click()
    })
  })

  //   监听登录form表单的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登陆失败')
        }
        layer.msg('登陆成功')
        console.log(res.token)
        localStorage.setItem('token', res.token)
        location.href = 'index.html'
      }
    })
  })
})
