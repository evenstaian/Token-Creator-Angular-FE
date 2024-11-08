(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard-dashboard-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/dashboard.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/dashboard.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- ============================================================== -->\r\n<!-- Sales chart -->\r\n<!-- ============================================================== -->\r\n<div class=\"row\">\r\n    <div class=\"col-md-8\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <div class=\"d-md-flex align-items-center\">\r\n                    <div>\r\n                        <h4 class=\"card-title\">Sales Summary</h4>\r\n                        <h5 class=\"card-subtitle\">Overview of Latest Month</h5>\r\n                    </div>\r\n                    <div class=\"ml-auto d-flex no-block align-items-center\">\r\n                        <ul class=\"list-inline font-12 dl m-r-15 m-b-0\">\r\n                            <li class=\"list-inline-item text-info\"><i class=\"fa fa-circle\"></i> Iphone</li>\r\n                            <li class=\"list-inline-item text-primary\"><i class=\"fa fa-circle\"></i> Ipad</li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <!-- column -->\r\n                    <div class=\"col-lg-12\">\r\n                        <div style=\"height: 300px;\">\r\n                            <canvas baseChart height=\"130\" [datasets]=\"lineChartData\" [labels]=\"lineChartLabels\"\r\n                                [options]=\"lineChartOptions\" [colors]=\"lineChartColors\" [legend]=\"lineChartLegend\"\r\n                                [chartType]=\"lineChartType\">\r\n                            </canvas>\r\n                        </div>\r\n                    </div>\r\n                    <!-- column -->\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-4\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h4 class=\"card-title\">Feeds</h4>\r\n                <div class=\"feed-widget\">\r\n                    <ul class=\"list-style-none feed-body m-0 p-b-20\">\r\n                        <li class=\"feed-item\">\r\n                            <div class=\"feed-icon bg-info\"><i class=\"far fa-bell\"></i></div> You have 4 pending tasks. <span class=\"ml-auto font-12 text-muted\">Just Now</span></li>\r\n                        <li class=\"feed-item\">\r\n                            <div class=\"feed-icon bg-success\"><i class=\"ti-server\"></i></div> Server #1 overloaded.<span class=\"ml-auto font-12 text-muted\">2 Hours ago</span></li>\r\n                        <li class=\"feed-item\">\r\n                            <div class=\"feed-icon bg-warning\"><i class=\"ti-shopping-cart\"></i></div> New order received.<span class=\"ml-auto font-12 text-muted\">31 May</span></li>\r\n                        <li class=\"feed-item\">\r\n                            <div class=\"feed-icon bg-danger\"><i class=\"ti-user\"></i></div> New user registered.<span class=\"ml-auto font-12 text-muted\">30 May</span></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- ============================================================== -->\r\n<!-- Sales chart -->\r\n<!-- ============================================================== -->\r\n<!-- ============================================================== -->\r\n<!-- Table -->\r\n<!-- ============================================================== -->\r\n<div class=\"row\">\r\n    <!-- column -->\r\n    <div class=\"col-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <!-- title -->\r\n                <div class=\"d-md-flex align-items-center\">\r\n                    <div>\r\n                        <h4 class=\"card-title\">Top Selling Products</h4>\r\n                        <h5 class=\"card-subtitle\">Overview of Top Selling Items</h5>\r\n                    </div>\r\n                    <div class=\"ml-auto\">\r\n                        <div class=\"dl\">\r\n                            <select class=\"custom-select\">\r\n                                <option value=\"0\" selected>Monthly</option>\r\n                                <option value=\"1\">Daily</option>\r\n                                <option value=\"2\">Weekly</option>\r\n                                <option value=\"3\">Yearly</option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <!-- title -->\r\n            </div>\r\n            <div class=\"table-responsive\">\r\n                <table class=\"table v-middle\">\r\n                    <thead>\r\n                        <tr class=\"bg-light\">\r\n                            <th class=\"border-top-0\">Products</th>\r\n                            <th class=\"border-top-0\">License</th>\r\n                            <th class=\"border-top-0\">Support Agent</th>\r\n                            <th class=\"border-top-0\">Technology</th>\r\n                            <th class=\"border-top-0\">Tickets</th>\r\n                            <th class=\"border-top-0\">Sales</th>\r\n                            <th class=\"border-top-0\">Earnings</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr>\r\n                            <td>\r\n                                <div class=\"d-flex align-items-center\">\r\n                                    <div class=\"m-r-10\"><a class=\"btn btn-circle btn-info text-white\">E</a></div>\r\n                                    <div class=\"\">\r\n                                        <h4 class=\"m-b-0 font-16\">Elite Admin</h4>\r\n                                    </div>\r\n                                </div>\r\n                            </td>\r\n                            <td>Single Use</td>\r\n                            <td>John Doe</td>\r\n                            <td>\r\n                                <label class=\"label label-danger\">Angular</label>\r\n                            </td>\r\n                            <td>46</td>\r\n                            <td>356</td>\r\n                            <td>\r\n                                <h5 class=\"m-b-0\">$2850.06</h5>\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>\r\n                                <div class=\"d-flex align-items-center\">\r\n                                    <div class=\"m-r-10\"><a class=\"btn btn-circle btn-orange text-white\">M</a></div>\r\n                                    <div class=\"\">\r\n                                        <h4 class=\"m-b-0 font-16\">Monster Admin</h4>\r\n                                    </div>\r\n                                </div>\r\n                            </td>\r\n                            <td>Single Use</td>\r\n                            <td>Venessa Fern</td>\r\n                            <td>\r\n                                <label class=\"label label-info\">Vue Js</label>\r\n                            </td>\r\n                            <td>46</td>\r\n                            <td>356</td>\r\n                            <td>\r\n                                <h5 class=\"m-b-0\">$2850.06</h5>\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>\r\n                                <div class=\"d-flex align-items-center\">\r\n                                    <div class=\"m-r-10\"><a class=\"btn btn-circle btn-success text-white\">M</a></div>\r\n                                    <div class=\"\">\r\n                                        <h4 class=\"m-b-0 font-16\">Material Pro Admin</h4>\r\n                                    </div>\r\n                                </div>\r\n                            </td>\r\n                            <td>Single Use</td>\r\n                            <td>John Doe</td>\r\n                            <td>\r\n                                <label class=\"label label-success\">Bootstrap</label>\r\n                            </td>\r\n                            <td>46</td>\r\n                            <td>356</td>\r\n                            <td>\r\n                                <h5 class=\"m-b-0\">$2850.06</h5>\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>\r\n                                <div class=\"d-flex align-items-center\">\r\n                                    <div class=\"m-r-10\"><a class=\"btn btn-circle btn-purple text-white\">A</a></div>\r\n                                    <div class=\"\">\r\n                                        <h4 class=\"m-b-0 font-16\">Ample Admin</h4>\r\n                                    </div>\r\n                                </div>\r\n                            </td>\r\n                            <td>Single Use</td>\r\n                            <td>John Doe</td>\r\n                            <td>\r\n                                <label class=\"label label-purple\">React</label>\r\n                            </td>\r\n                            <td>46</td>\r\n                            <td>356</td>\r\n                            <td>\r\n                                <h5 class=\"m-b-0\">$2850.06</h5>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- ============================================================== -->\r\n<!-- Table -->\r\n<!-- ============================================================== -->\r\n<!-- ============================================================== -->\r\n<!-- Recent comment and chats -->\r\n<!-- ============================================================== -->\r\n<div class=\"row\">\r\n    <!-- column -->\r\n    <div class=\"col-lg-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h4 class=\"card-title\">Recent Comments</h4>\r\n            </div>\r\n            <div class=\"comment-widgets scrollable\">\r\n                <!-- Comment Row -->\r\n                <div class=\"d-flex flex-row comment-row m-t-0\">\r\n                    <div class=\"p-2\"><img src=\"assets/images/users/1.jpg\" alt=\"user\" width=\"50\" class=\"rounded-circle\"></div>\r\n                    <div class=\"comment-text w-100\">\r\n                        <h6 class=\"font-medium\">James Anderson</h6>\r\n                        <span class=\"m-b-15 d-block\">Lorem Ipsum is simply dummy text of the printing and type setting industry. </span>\r\n                        <div class=\"comment-footer\">\r\n                            <span class=\"text-muted float-right\">April 14, 2016</span> <span class=\"label label-rounded label-primary\">Pending</span> <span class=\"action-icons\">\r\n                                    <a href=\"javascript:void(0)\"><i class=\"ti-pencil-alt\"></i></a>\r\n                                    <a href=\"javascript:void(0)\"><i class=\"ti-check\"></i></a>\r\n                                    <a href=\"javascript:void(0)\"><i class=\"ti-heart\"></i></a>    \r\n                                </span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <!-- Comment Row -->\r\n                <div class=\"d-flex flex-row comment-row\">\r\n                    <div class=\"p-2\"><img src=\"assets/images/users/4.jpg\" alt=\"user\" width=\"50\" class=\"rounded-circle\"></div>\r\n                    <div class=\"comment-text active w-100\">\r\n                        <h6 class=\"font-medium\">Michael Jorden</h6>\r\n                        <span class=\"m-b-15 d-block\">Lorem Ipsum is simply dummy text of the printing and type setting industry. </span>\r\n                        <div class=\"comment-footer \">\r\n                            <span class=\"text-muted float-right\">April 14, 2016</span>\r\n                            <span class=\"label label-success label-rounded\">Approved</span>\r\n                            <span class=\"action-icons active\">\r\n                                    <a href=\"javascript:void(0)\"><i class=\"ti-pencil-alt\"></i></a>\r\n                                    <a href=\"javascript:void(0)\"><i class=\"icon-close\"></i></a>\r\n                                    <a href=\"javascript:void(0)\"><i class=\"ti-heart text-danger\"></i></a>    \r\n                                </span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <!-- Comment Row -->\r\n                <div class=\"d-flex flex-row comment-row\">\r\n                    <div class=\"p-2\"><img src=\"assets/images/users/5.jpg\" alt=\"user\" width=\"50\" class=\"rounded-circle\"></div>\r\n                    <div class=\"comment-text w-100\">\r\n                        <h6 class=\"font-medium\">Johnathan Doeting</h6>\r\n                        <span class=\"m-b-15 d-block\">Lorem Ipsum is simply dummy text of the printing and type setting industry. </span>\r\n                        <div class=\"comment-footer\">\r\n                            <span class=\"text-muted float-right\">April 14, 2016</span>\r\n                            <span class=\"label label-rounded label-danger\">Rejected</span>\r\n                            <span class=\"action-icons\">\r\n                                    <a href=\"javascript:void(0)\"><i class=\"ti-pencil-alt\"></i></a>\r\n                                    <a href=\"javascript:void(0)\"><i class=\"ti-check\"></i></a>\r\n                                    <a href=\"javascript:void(0)\"><i class=\"ti-heart\"></i></a>    \r\n                                </span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- column -->\r\n    <div class=\"col-lg-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <h4 class=\"card-title\">Temp Guide</h4>\r\n                <div class=\"d-flex align-items-center flex-row m-t-30\">\r\n                    <div class=\"display-5 text-info\"><i class=\"wi wi-day-showers\"></i> <span>73<sup>°</sup></span></div>\r\n                    <div class=\"m-l-10\">\r\n                        <h3 class=\"m-b-0\">Saturday</h3><small>Ahmedabad, India</small>\r\n                    </div>\r\n                </div>\r\n                <table class=\"table no-border mini-table m-t-20\">\r\n                    <tbody>\r\n                        <tr>\r\n                            <td class=\"text-muted\">Wind</td>\r\n                            <td class=\"font-medium\">ESE 17 mph</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-muted\">Humidity</td>\r\n                            <td class=\"font-medium\">83%</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-muted\">Pressure</td>\r\n                            <td class=\"font-medium\">28.56 in</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td class=\"text-muted\">Cloud Cover</td>\r\n                            <td class=\"font-medium\">78%</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n                <ul class=\"row list-style-none text-center m-t-30\">\r\n                    <li class=\"col-3\">\r\n                        <h4 class=\"text-info\"><i class=\"wi wi-day-sunny\"></i></h4>\r\n                        <span class=\"d-block text-muted\">09:30</span>\r\n                        <h3 class=\"m-t-5\">70<sup>°</sup></h3>\r\n                    </li>\r\n                    <li class=\"col-3\">\r\n                        <h4 class=\"text-info\"><i class=\"wi wi-day-cloudy\"></i></h4>\r\n                        <span class=\"d-block text-muted\">11:30</span>\r\n                        <h3 class=\"m-t-5\">72<sup>°</sup></h3>\r\n                    </li>\r\n                    <li class=\"col-3\">\r\n                        <h4 class=\"text-info\"><i class=\"wi wi-day-hail\"></i></h4>\r\n                        <span class=\"d-block text-muted\">13:30</span>\r\n                        <h3 class=\"m-t-5\">75<sup>°</sup></h3>\r\n                    </li>\r\n                    <li class=\"col-3\">\r\n                        <h4 class=\"text-info\"><i class=\"wi wi-day-sprinkle\"></i></h4>\r\n                        <span class=\"d-block text-muted\">15:30</span>\r\n                        <h3 class=\"m-t-5\">76<sup>°</sup></h3>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- ============================================================== -->\r\n<!-- Recent comment and chats -->\r\n<!-- ============================================================== -->");

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

//declare var require: any;
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent() {
        // lineChart
        this.lineChartData = [
            { data: [0, 5, 6, 8, 25, 9, 8, 24], label: 'Iphone' },
            { data: [0, 3, 1, 2, 8, 1, 5, 1], label: 'Ipad' }
        ];
        this.lineChartLabels = [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
        ];
        this.lineChartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };
        this.lineChartColors = [
            {
                // grey
                backgroundColor: 'rgba(41, 98, 255,0.1)',
                borderColor: '#2962FF',
                pointBackgroundColor: '#2962FF',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#2962FF'
            },
            {
                // dark grey
                backgroundColor: 'rgba(116, 96, 238,0.1)',
                borderColor: '#7460ee',
                pointBackgroundColor: '#7460ee',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#7460ee'
            }
        ];
        this.lineChartLegend = false;
        this.lineChartType = 'line';
        this.subtitle = 'This is some text within a card block.';
    }
    DashboardComponent.prototype.ngAfterViewInit = function () { };
    DashboardComponent.ctorParameters = function () { return []; };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __importDefault(__webpack_require__(/*! raw-loader!./dashboard.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/dashboard.component.html")).default
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.module.ts":
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm2015/ng2-charts.js");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    {
        path: '',
        data: {
            title: 'Dashboard',
            urls: [
                { title: 'Dashboard', url: '/' },
                { title: 'Dashboard' }
            ]
        },
        component: _dashboard_component__WEBPACK_IMPORTED_MODULE_5__["DashboardComponent"]
    }
];
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes), ng2_charts__WEBPACK_IMPORTED_MODULE_4__["ChartsModule"]],
            declarations: [_dashboard_component__WEBPACK_IMPORTED_MODULE_5__["DashboardComponent"]]
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ })

}]);
//# sourceMappingURL=dashboard-dashboard-module.js.map