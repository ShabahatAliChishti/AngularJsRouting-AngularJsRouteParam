var app = angular
    //all routing features are present in ngRoute
    .module("Demo", ["ngRoute"])
    //config function to specifiy configuration
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "Templates/home.html",
                //controller: "homeController as homeCtrl",
          
                  controller: "homeController",
                        //2nd way
                controllerAs: "homeCtrl"
            })
            .when("/courses", {
                templateUrl: "Templates/courses.html",
                controller: "coursesController as coursesCtrl"
            })
            .when("/students", {
                templateUrl: "Templates/students.html",
                controller: "studentsController as studentsCtrl"
            })
            //pass parameter using :
            .when("/students/:id", {
                templateUrl: "Templates/studentDetails.html",
                controller: "studentDetailsController as studentDetailsCtrl"
            })
            .otherwise
            ({

                redirectTo:"/home"
            
        })
    
        //htmlmode5 routing enable here
        $locationProvider.html5Mode(true);
        
    })
    .controller("homeController", function () {
        this.message = "Home Page";
    })
    .controller("coursesController", function () {
        this.courses = ["C#", "VB.NET", "ASP.NET", "SQL Server", "AngularJS", "JavaScript"];
    })
    //$route service for reload route
    .controller("studentsController", function ($http,$route) {
        var vm = this;
        vm.reloadData = function () {
            $route.reload();
        }
        $http.get("StudentService.asmx/GetAllStudents")
            .then(function (response) {
               vm.students = response.data;
            })
    })
    .controller("studentDetailsController", function ($http, $routeParams) {
        var vm = this;

        $http({
            url: "StudentService.asmx/GetStudent",
            method: "get",
            //to retreive parameter value we use $routeParams object
            params: { id: $routeParams.id }
        }).then(function (response) {
            vm.student = response.data;
        })

    })