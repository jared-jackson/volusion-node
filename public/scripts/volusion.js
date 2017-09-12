angular.module('VolusionApp', [])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
    .controller('VolusionController', ['$scope', '$http', '$log',
        function ($scope, $http, $log) {
            var api_root = 'https://cqze8l1aq1.execute-api.us-east-1.amazonaws.com/latest';
            $scope.consultWatson = function () {
                var consult_url = $scope.consult_url;
                $scope.error = false;
                $scope.loading = true;

                $http({
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    url: api_root + '?url=' + consult_url
                }).then(function successCallback(response) {
                    var emotion_values = $.map(response.data, function (value) {
                        return [value];
                    });
                    if (emotion_values) {
                        for (var emotion in emotion_values) {
                            $scope.circles[emotion].animate(emotion_values[emotion]);
                        }
                        $scope.loading = false;
                    }
                }, function errorCallback(response) {
                    $scope.error_message = "";
                    $scope.loading = false;
                    $scope.error = true;
                    if (response.data) {
                        switch (response.data.errorMessage) {
                            case "invalid request: content is empty":
                                $scope.error_message = "Please enter the url to a Volusion blog entry. Ex: https://www.volusion.com/blog/something-to-be-proud-of-pride-socks/";
                                break;
                            default:
                                $scope.error_message = response.data.errorMessage;
                        }
                    } else {
                        $scope.error_message = "Something else went wrong with your request. Check to make sure you entered a valid Volusion blog url.";
                    }
                });
            };
            $scope.circles = assembleRadials();
            for (var circle  in $scope.circles) {
                $scope.circles[circle].animate(0.0);
            }
        }
    ]);

function assembleRadials() {
    var radial;
    var circles = [];
    for (var x = 0; x <= 4; x++) { // Watson only returns us with 5 emotions. Typically wouldn't hard code a value like this.
        var container = '#container' + x;
        radial = new ProgressBar.Circle(container, {
            color: '#8759f2',
            strokeWidth: 4,
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 2400,
            text: {
                autoStyleContainer: false
            },
            from: {color: '#ffc300', width: 2},
            to: {color: '#1fd2ca', width: 4},
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);
                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText('0%');
                } else {
                    circle.setText(value + "%");
                }
            }
        });
        circles.push(radial);
        radial.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        radial.text.style.fontSize = '2rem';
    }
    return circles;
}
