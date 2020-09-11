// Turkey
export const locale = {
	lang: 'tr',
	data: {
		TRANSLATOR: {
			SELECT: 'Dil Seçiniz ...',
		},
		MENU: {
			SELLING: 'Satış İşlemleri'
		},
		COMMON: {
			ADD: "Ekle",
			MALE: "Erkek",
			FEMALE: "Kadın",
			SEARCH: "Ara ...",
			START_DATE: "Başlangıç Tarihi",
			END_DATE: "Bitiş Tarihi",
			PLEASE_SELECT: "Lütfen Seçiniz ..."
		},
		SELLING_MODULE: {
			NORMAL_SALE: {
				TITLE: "Normal Satış",
				SELLING_PRICE: "Satış Fiyatı",
				DATE: "Tarih",
				TOTAL: "Toplam",
				USER_CODE: "Satıcı Kodu",
				BRANCH_NAME: "Şube",
				PRODUCT_NAME: "Ürün",
				PRODUCT_FULL_CODE: "Ürün Tam Kodu",
				PRODUCT_CODE: "Ürün Kodu",
				COLOR_NAME: "Renk",
				GENDER: "Cinsiyet",
				PRODUCT_YEAR: "Model Tarihi",
				SIZE: "Beden",
				PRODUCT_COUNT: "Adet",
				PAYMENT_NAME: "Ödeme Yöntemi",
				PAYMENT_TYPE: "Vade",
				DEFFEREDED_PAYMENT_COUNT: "Vade Sayısı",
				RECEIPT: "Dekont No.",
				AMOUNT: "Miktar",
				PAYMENT_METHODS: "Ödeme Yöntemleri",
				COLORS: "Renk",
				BRANCHES: "Şube",
				COLORS_SHORTCODES: "Renk Kısaltması",
				BRANCH_ADRES: "Adres",
				ADD: "Ekle",
				PRICE: "Fiyat",
				SEARCH_IN_SALES: "Satılanlar Ürünlerde Ara",
				SOLED_PRODUCTS: "Satılan Ürünler",
				SALES_SCREEN: {
					SELECT_PAYMENT: "Ödeme Seçiniz",
					CASH: "Nakit",
					BANK_PAYMENT: "Banka Ödemesi",
					PAYMENT_TYPE: "Ödeme Yötemi",
					DEFFERED_PAYMENT_COUNT: "Vade",
					AMOUNT: "Tutar",
					TOTAL: "Toplam",
					COMPLETE_PAYMENT: "Ödemeyi Tamamla"
				}
			}

		},
		STOCK_MODULE: {
			MASTER_DATA: {
				TITLE: "Ana Veri",
				PAYMENT_METHODS: "Ödeme Yöntemleri",
				COLORS: "Renk",
				BRANCHES: 'Şube',
				COLORS_SHORTCODES: "Renk Kısaltması",
				BRANCH_NAME: "Şube Adı",
				BRANCH_ADRES: "Adres",
				PAYMENT_NAME: "Ödeme İsmi",
				PAYMENT_TYPE: "Vadeli Ödeme İmkanı",
				ADD: "Ekle",
				FILL: "Doldu",
				PRODUCT_NAME: "Ürün İsmi",
				PRODUCT_FULL_CODE: "Ürün barkodu",
				COLOR_NAME: "Renk",
				GENDER: "Cinsiyet",
				PRICE: "Fiyat",
				PRODUCT_YEAR: "Ürün tarihi",
				PRODUCT_CODE: "Ürün Kodu",
				SIZE: "Beden",
				COUNT: "Adet",
				SEARCH: "Ara",
				SELLING_PRICE: "Satış Fiyatı",
			}
		},
		ADMIN_MODULE: {
			USER_MANAGEMENT: {
				TITLE: "Kullanıcı Yönetimi",
				USER_NAME: "K. Adı",
				USER_CODE: "K. Kodu",
				USER_STATUS: "K. Durumu",
				PASSWORD: "Şifre",
				IMAGE_PATH: "Foto.",
				EMAIL: "Email",
				CELLPHONE: "TEL.",
				NAME: "İsim",
				LASTNAME: "Soy İsim",
				BRANCH: "Şube",
			},
			LOGIN: {
				LOGIN_TITLE: "Lütfen Giriş Yapınız",
				LOGIN_BUTTON: "Giriş Yap"
			}
		},
		EXCEPTIONS: {
			NO_ENOUGHT_COUNT: "Stokta bu üründen kalmamıştır.",
			NO_SUCH_PRODUCT: "Stokta nolu bir ürün bulunmamaktadır.",
			ERROR: "HATA !",
			SQL_RELATIONSHIP: "Silmeye çalıştığınız kayıt başka yerde kullanılmıştır. Lütfen bu kayıtla ilişkili diğer kayıtları silip tekrar deneyiniz."

		},
		VALIDATIONS: {
			CONTROL_REQURIRED: "{{formName}} Boş Olamaz.",
			MAX_LENGTH: "en fazla {{maxLength}} ",
			MIN_LENGTH: "en az {{minLength}}"
		},
		MESSAGES: {
			REMAINING_PRODUCTS_COUNT: "Bu üründen stokta sadece {{count}} tane kalmıştır."
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
