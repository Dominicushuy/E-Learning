$(document).ready(function() {
	//Xử lý phần đăng ký
	var dangKyService = new DangKySerVice();
	dangKyService.DangKy();

	//Xử lý phần đăng nhập
	var dangNhapServer = new DangNhapService();
	dangNhapServer.DangNhap();

	//Tạo mới Thông tin Service
	var thongTinService = new ThongTinService();

	//Tạo mới khóa học service
	var khoaHocService = new KhoaHocService();


});