// Arabic
export const locale = {
	lang: 'ar',
	data: {
		TRANSLATOR: {
			SELECT: 'اختر اللغة ...',
		},
		MENU: {
			SELLING: 'عمليات البيع'
		},
		COMMON: {
			ADD: "إضافة",
			MALE: "Erkek",
			FEMALE: "Kadın",
			SEARCH: "Ara ...",
			START_DATE: "Başlangıç Tarihi",
			END_DATE: "Bitiş Tarihi",
			PLEASE_SELECT: "Lütfen Seçiniz ..."
		},
		SELLING_MODULE: {
			NORMAL_SALE: {
				TITLE: "البيع العادي",
				SELLING_PRICE: "سعر المبيع",
				DATE: "تاريخ",
				TOTAL: "الاجمالي",
				USER_CODE: "كود البائع",
				BRANCH_NAME: "اسم الفرع",
				PRODUCT_NAME: "اسم المنتج",
				PRODUCT_FULL_CODE: "باركود المنتج",
				PRODUCT_CODE: "كود المنتج",
				COLOR_NAME: "اللون",
				GENDER: "الجنس",
				PRODUCT_YEAR: "تاريخ المنتج",
				SIZE: "القياس",
				PRODUCT_COUNT: "العدد",
				PAYMENT_NAME: "اسم طريقة الدفع",
				PAYMENT_TYPE: "إمكانية الدفع بالتقسيط",
				DEFFEREDED_PAYMENT_COUNT: "عدد التقسيط",
				RECEIPT: "رقم الفاتورة",
				AMOUNT: "الكمية",
				PAYMENT_METHODS: "طرق الدفع",
				COLORS: "الألوان",
				BRANCHES: "الفروع",
				COLORS_SHORTCODES: "اختصار اللون",
				BRANCH_ADRES: "العنوان",
				ADD: "أضف",
				FILL: "املأ",
				PRICE: "السعر",
				SEARCH_IN_SALES: "ابحث في المبيعات",
				SOLED_PRODUCTS: "المنتجات المباعة",
				SALES_SCREEN: {
					SELECT_PAYMENT: "اختر طريقة الدفع",
					CASH: "دفع نقدي",
					BANK_PAYMENT: "دفع عن طريق البنك",
					PAYMENT_TYPE: "طريقة الدفع",
					DEFFERED_PAYMENT_COUNT: "عدد التقيسط",
					AMOUNT: "المبلغ",
					TOTAL: "المجموع",
					COMPLETE_PAYMENT: "أتمم عملية الدفع"
				}
			}

		},
		STOCK_MODULE: {
			MASTER_DATA: {
				TITLE: "المعلومات الرئيسية",
				PAYMENT_METHODS: "طرق الدفع",
				COLORS: "الألوان",
				BRANCHES: "الفروع",
				COLORS_SHORTCODES: "اختصار اللون",
				BRANCH_NAME: "اسم الفرع",
				BRANCH_ADRES: "العنوان",
				PAYMENT_NAME: "اسم طريقة الدفع",
				PAYMENT_TYPE: "إمكانية الدفع بالتقسيط",
				ADD: "أضف",
				FILL: "املأ",
				PRODUCT_NAME: "اسم المنتج",
				PRODUCT_FULL_CODE: "باركود المنتج",
				COLOR_NAME: "اللون",
				GENDER: "الجنس",
				PRICE: "السعر",
				PRODUCT_YEAR: "تاريخ المنتج",
				PRODUCT_CODE: "كود المنتج",
				SIZE: "القياس",
				COUNT: "العدد",
				SEARCH: "ابحث ...",
				SELLING_PRICE: "سعر المبيع",
			}
		},
		ADMIN_MODULE: {
			USER_MANAGEMENT: {
				TITLE: "إدارة المستخدمين",
				USER_NAME: "اسم المستخدم",
				USER_CODE: "كود المستخدم",
				USER_STATUS: "الحالة",
				PASSWORD: "كلمة السر",
				IMAGE_PATH: "الصورة",
				EMAIL: "الايميل",
				CELLPHONE: "رقم الهاتف",
				NAME: "الاسم",
				LASTNAME: "الكنية",
				BRANCH: "الفرع",
				ROLE: "درجة الوصول"
			},
			ROLE_MANAGEMENT: {
				TITLE: "الأدوار",
				ROLE_NAME: "درجة الوصول",
				SAVE: "حفظ"
			},
			LOGIN: {
				LOGIN_TITLE: "لطفاً قم بتسجيل الدخول",
				LOGIN_BUTTON: "تسجيل الدخول"
			}
		},
		EXCEPTIONS: {
			NO_ENOUGHT_COUNT: "لم يتبق من هذا المنتج",
			NO_SUCH_PRODUCT: ".لايوجد منتج بهذا الرقم في المخزن",
			ERROR: "خطأ",
			SQL_RELATIONSHIP: "القيد الذي تحاول مسحه تم استخدامه في مكان آخر. امسح القيود المتعلقة بهذا القيد ثم حاول مسحه مرة أخرى.",
			EXISTING_PRODUCTS: "بعض المنتجات لم يتم إضافتها لأنها موجودة مسبقاً"
		},
		VALIDATIONS: {
			CONTROL_REQURIRED: "{{formName}} لا يمكن أن يكون فارغاً",
			MAX_LENGTH: "الحد الأقصى {{maxLength}}",
			MIN_LENGTH: "الحد الأدنى {{minLength}}"
		},
		MESSAGES: {
			REMAINING_PRODUCTS_COUNT: "بقي {{count}} قطع من هذا المنتج في المخزن."
		},
		NAV: {
			MAIN_MENU: "الصفحة الرئيسية",
			SELLING_MODULE: "قسم البيع",
			NORMAL_SALE: "صفحة البيع",
			MASTERDATA: "المعلومات الأساسية",
			PRODUCT_MANAGEMENT: "إدارة المنتجات",
			USER_MANAGEMENT: "إدارة المستخدمين",
			STOCK_MODULE: "قسم المخزن",
			ROLE_MANAGEMENT: "إدارة وصول المستخدمين",
			STOCK_MODULE_PAGES: "Stok Modulü Sayfaları",
			ADMIN_MODULE_PAGES: "Admin Modulü Sayfaları",
			SELLING_MODULE_PAGES: "Satış Modulü Sayfaları"
		},
		AUTH: {
			GENERAL: {
				OR: 'Or',
				SUBMIT_BUTTON: 'Submit',
				NO_ACCOUNT: 'Don\'t have an account?',
				SIGNUP_BUTTON: 'Sign Up',
				FORGOT_BUTTON: 'Forgot Password',
				BACK_BUTTON: 'Back',
				PRIVACY: 'Privacy',
				LEGAL: 'Legal',
				CONTACT: 'Contact',
			},
			LOGIN: {
				TITLE: 'Login Account',
				BUTTON: 'Sign In',
			},
			FORGOT: {
				TITLE: 'Forgotten Password?',
				DESC: 'Enter your email to reset your password',
				SUCCESS: 'Your account has been successfully reset.'
			},
			REGISTER: {
				TITLE: 'Sign Up',
				DESC: 'Enter your details to create your account',
				SUCCESS: 'Your account has been successfuly registered.'
			},
			INPUT: {
				EMAIL: 'Email',
				FULLNAME: 'Fullname',
				PASSWORD: 'Password',
				CONFIRM_PASSWORD: 'Confirm Password',
				USERNAME: 'Username'
			},
			VALIDATION: {
				INVALID: '{{name}} is not valid',
				REQUIRED: '{{name}} is required',
				MIN_LENGTH: '{{name}} minimum length is {{min}}',
				AGREEMENT_REQUIRED: 'Accepting terms & conditions are required',
				NOT_FOUND: 'The requested {{name}} is not found',
				INVALID_LOGIN: 'The login detail is incorrect',
				REQUIRED_FIELD: 'Required field',
				MIN_LENGTH_FIELD: 'Minimum field length:',
				MAX_LENGTH_FIELD: 'Maximum field length:',
				INVALID_FIELD: 'Field is not valid',
			}
		},
		ECOMMERCE: {
			COMMON: {
				SELECTED_RECORDS_COUNT: 'Selected records count: ',
				ALL: 'All',
				SUSPENDED: 'Suspended',
				ACTIVE: 'Active',
				FILTER: 'Filter',
				BY_STATUS: 'by Status',
				BY_TYPE: 'by Type',
				BUSINESS: 'Business',
				INDIVIDUAL: 'Individual',
				SEARCH: 'Search',
				IN_ALL_FIELDS: 'in all fields'
			},
			ECOMMERCE: 'eCommerce',
			CUSTOMERS: {
				CUSTOMERS: 'Customers',
				CUSTOMERS_LIST: 'Customers list',
				NEW_CUSTOMER: 'New Customer',
				DELETE_CUSTOMER_SIMPLE: {
					TITLE: 'Customer Delete',
					DESCRIPTION: 'Are you sure to permanently delete this customer?',
					WAIT_DESCRIPTION: 'Customer is deleting...',
					MESSAGE: 'Customer has been deleted'
				},
				DELETE_CUSTOMER_MULTY: {
					TITLE: 'Customers Delete',
					DESCRIPTION: 'Are you sure to permanently delete selected customers?',
					WAIT_DESCRIPTION: 'Customers are deleting...',
					MESSAGE: 'Selected customers have been deleted'
				},
				UPDATE_STATUS: {
					TITLE: 'Status has been updated for selected customers',
					MESSAGE: 'Selected customers status have successfully been updated'
				},
				EDIT: {
					UPDATE_MESSAGE: 'Customer has been updated',
					ADD_MESSAGE: 'Customer has been created'
				}
			}
		}
	}
};
