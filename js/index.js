$(document)
    .ready(function () {
        setup();
        // // fix menu when passed
        // $('.masthead')
        //     .visibility({
        //         once: false,
        //         onBottomPassed: function () {
        //             $('.fixed.menu').transition('fade in');
        //         },
        //         onBottomPassedReverse: function () {
        //             $('.fixed.menu').transition('fade out');
        //         }
        //     })
        //     ;

        // // create sidebar and attach to menu open
        // $('.ui.sidebar')
        //     .sidebar('attach events', '.toc.item')
        //     ;

    })
    ;
//funciton(){$('#loginModal').modal('show');}

var formConfig = function () {
    $('#loginForm')
        .form({
            //Handles the validation on the form
            fields: {
                email: {
                    identifier: 'email',
                    rules: [
                        {
                            type: 'email',
                            prompt: 'Please enter a valid e-mail'
                        }
                    ]
                },
                password: {
                    identifier: 'password',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Please enter a password'
                        },
                        {
                            type: 'minLength[6]',
                            prompt: 'Your password must be at least {ruleValue} characters'
                        }
                    ]
                }
            },
            onSuccess: function (event, fields) {
                //what happens when the form is filed in
                setToken("email", fileds.email);//store the users email in rootscope
                console.log("signed in", fields.email);
            },
            onFailure: function (formErrors, fields) {
                return; // What happens when the form is not filed out
            },
            keyboardShortcuts: false //disables enter key trigger
        });
}

var modalConfig = function () {
    $('#loginModal').modal({
        closable: false,//forces the user to close the modal through one of the buttons
        //On Deny & On Approve handle the closing of the modal.
        //if they return true, modal closes
        onDeny: function () {
            //Reset the form on the cancel button
            $('#loginForm').form('reset')
            $('#loginForm .error.message').empty(); //clears Error messages
            return true;
        },
        onApprove: function () {
            //checks the validation of the form
            $('#loginForm').form('validate form');//call the form's on success or on failure
            return $('#loginForm').form('is valid');
        }
    });
    $('#loginModal') //Attachs the modal open function to all objects with the class .login-btn
     .modal('attach events', '.login-btn', 'show');
}

var setup = function(){
    formConfig();
    modalConfig();
}