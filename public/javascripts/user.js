$(()=>{
  let bodyContainer = $('.body-container');
  let topContainer = $('.top-container');
  let midContainer = $('.mid-container');
  let btmContainer = $('.btm-container');

  topContainer.append(`<div class='imgLogo'>
    <img src='images/Logo.png' alt='Tomei Logo'>
  </div>`);

  midContainer.append(`<div class='status'>
    <div class='step'>
      <img src='images/Wizard-Step1.png' alt='Step 1'>
      <p>Step 1:</p>
      <p>CREATE YOUR ACCOUNT PASSWORD</p>
    </div>
    <div class='step'>
      <img src='images/Wizard-Step2.png' alt='Step 2'>
      <p>Step 2:</p>
      <p>PERSONAL INFORMATION</p>
    </div>
    <div class='step'>
      <img src='images/Wizard-Step3.png' alt='Step 3'>
      <p>Step 3:</p>
      <p>EMPLOYMENT DETAILS</p>
    </div>
    <div class='step'>
      <img src='images/Wizard-Step4.png' alt='Step 4'>
      <p>Step 4:</p>
      <p>UPLOAD DOCUMENTS</p>
    </div>
    <div class='step'>
      <img src='images/Wizard-Step5.png' alt='Step 5'>
      <p>Step 5:</p>
      <p>COMPLETE</p>
    </div>
  </div>`)

  /* midContainer.append(`<div class='detailsStatus'>
    <img src='images/Wizard-Step1.png' alt='Step 1'>
    <img class='bar' src='images/Wizard-HorizontalBar.png' alt='line'>
    <img src='images/Wizard-Step2.png' alt='Step 2'>
    <img src='images/Wizard-HorizontalBar.png' alt='line'>
    <img src='images/Wizard-Step3.png' alt='Step 3'>
    <img src='images/Wizard-HorizontalBar.png' alt='line'>
    <img src='images/Wizard-Step4.png' alt='Step 4'>
    <img src='images/Wizard-HorizontalBar.png' alt='line'>
    <img src='images/Wizard-Step5.png' alt='Step 5'>
  </div>`);

  midContainer.append(`<div class='detailsIns'>
    <div class='step'>
      <p>Step 1:</p>
      <p>CREATE YOUR ACCOUNT PASSWORD</p>
    </div>
    <div class='step'>
      <p>Step 2:</p>
      <p>PERSONAL INFORMATION</p>
    </div>
    <div class='step'>
      <p>Step 3:</p>
      <p>EMPLOYMENT DETAILS</p>
    </div>
    <div class='step'>
      <p>Step 4:</p>
      <p>UPLOAD DOCUMENTS</p>
    </div>
    <div class='step'>
      <p>Step 5:</p>
      <p>COMPLETE</p>
    </div>
  </div>`) */

  btmContainer.append(`<div class='btmContHead'>
    <p>CREATE YOUR ACCOUNT</p>
  </div>
  <div class='btnContContent'>
    <div class='formInfo'>
      <p>Beacause there will be documents that you need to prepare to apply for this loan, let's start off by creating a password so that 
      you can login to your account once you have these documents ready.</p>
    </div>
    <div class='formContent'>
    </div>
  </div>`)

  let formContent = $('.formContent');

  let form = $(`<form id='form'>
    <div class='form'>
      <div class='avatarInput'>
        <img src='images/Avatar.png' alt='avatar'>
        <label for='img'><p>Upload</p></label>
        <input type='file' id='img' name='img'>
      </div>
      <div class='detailsInput'>
        <div class='field'>
          <label for='name'>Name</label>
          <input type='text' id='name' name='name'>
        </div>
        <div class='field'>
          <label for='email'>Email</label>
          <input type='email' id='email' name='email'>
        </div>
        <div class='field'>
          <label for='password'>Password</label>
          <input type='password' id='password' name='password'>
        </div>
        <div class='field'>
          <label for='cpassword'>Confirm Password</label>
          <input type='password' id='cpassword' name='cpassword'>
        </div> 
      </div>
    </div>
    <div class='btns'>
      <div class='left'></div>
      <div class='right'></div>
    </div>
  </form>`).appendTo(formContent);

  $('#img').hide();
  let btnSubmit = $('.btns .right').append(`<button type='button' class='btnSubmit'><p>SAVE & NEXT</p><img src='images/arrow-right.png' alt='Arrow Right'></button>`);

  btnSubmit.on('click', function(){
    let api = '/a/user/new_user';
    let postbody = getFormData();

    $.post(api, postbody).done(function(data){
      alert(`User ${data.new_user.name} has been created.`);
      $('.field input').val('')
    })
    .fail(function(x,s,e){
      console.error({x,s,e});
      alert(x.responseJSON.errMsg);
    })
  })

  function getFormData(){
    let name = $('#name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let cpassword = $('#cpassword').val();
    let picture = $('#img').val();
    console.log()
    let confirmPass = checkPassword(password, cpassword);

    return{
      name: name,
      email: email,
      password: confirmPass,
      picture: picture
    }
  }

  function checkPassword(password, cpassword){
    if(password != cpassword){
      alert('Password does not match');
      $('#password').val('');
      $('#cpassword').val('');
    }else{
      return password;
    }
  }

  /* let form = $(`<form id='form'>
    <label for='name'>Name: </label>
    <input type='text' id='name' name='name'>
    <label for='email'>Email: </label>
    <input type='email' id='email' name='email'>
    <label for='password'>Password: </label>
    <input type='password' id='password' name='password'>
    <label for='cpassword'>Confirm Password: </label>
    <input type='password' id='cpassword' name='cpassword'>
    <label for='img'>Image: </label>
    <input type='image' id='img' name='img'>
    <button class='btnSubmit' type='button'>Submit</button>
  </form>`).appendTo(btmContainer);

  let btnSubmit = $('.btnSubmit');

  btnSubmit.on('click', function(){
    let api = '/a/user/new_user';
    let postbody = getFormData();
    console.log(postbody)

    $.post(api, postbody).done(function(data){
      console.log(data)
    })
    .fail(function(x,s,e){
      console.error({x,s,e});
      alert(x.responseJSON.errMsg);
    })
  })

  function getFormData(){
    let name = $('#name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let cpassword = $('#cpassword').val();
    let confirmPass = checkPassword(password, cpassword);

    return{
      name: name,
      email: email,
      password: confirmPass
    }
  }

  function checkPassword(password, cpassword){
    if(password != cpassword){
      $('#password').val('');
      $('#cpassword').val('');
    }else{
      return password;
    }
  } */
  

})