$(document)
    .ready(function () {
        setup();

    });

var menuSetu = function () {
    $('.masthead')
        .visibility({
            once: false,
            onBottomPassed: function () {
                $('.fixed.menu').transition('fade in');
            },
            onBottomPassedReverse: function () {
                $('.fixed.menu').transition('fade out');
            }
        })
        ;

    // create sidebar and attach to menu open
    $('.ui.sidebar')
        .sidebar('attach events', '.toc.item');
}

var formConfig = function () {
    $('#loginForm')
        .form({
            //Handles the validation on the form
            fields: {
                email: {
                    identifier: 'email',
                    rules: [
                    ]
                },
                password: {
                    identifier: 'password',
                    rules: [
                    ]
                }
            },
            onSuccess: function (event, fields) {
                //what happens when the form is filed in
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

var setup = function () {
    formConfig();
    modalConfig();
}