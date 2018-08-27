$(document).ready(function() {
	//<======================================== Login =============================================================>
	//Xử lý phần đăng ký>
	var dangKyService = new DangKySerVice();
	dangKyService.DangKy();

	//Xử lý phần đăng nhập
	var dangNhapServer = new DangNhapService();
	dangNhapServer.DangNhap();
	dangNhapServer.LogOut();

	//<==================================== Khóa học service ======================================================>
	//Tạo mới khóa học service
	var khoaHocService = new KhoaHocService();
	//Load danh sách các khóa học hiện có
	khoaHocService.LayDanhSachKhoaHoc();
	//Load DS khóa học đã ghi danh
	khoaHocService.LoadDanhSachKhoaHocDaGhiDanh();

	//====================================== Ghi danh khóa học =====================================================>
	var ghiDanhService = new GhiDanhService();
	ghiDanhService.GhiDanh();

	//<====================================Tìm Kiếm khóa học=======================================================>
	$('#txtTuKhoa').keyup(TimKiemKhoaHoc);
	//Lọc ra danh sách khóa học
	function TimKiemKhoaHoc(){
		var tuKhoa = $(this).val().trim();
		var cardKH = $('.cardKhoaHoc');

		for (var i = 0; i < cardKH.length; i++) {
			var tenKH = cardKH[i].getElementsByTagName('h3')[0];
			var danhSachKQ = cardKH[i];
			if(tenKH){
				if(tenKH.innerHTML.toLowerCase().indexOf(tuKhoa) >-1){
					cardKH[i].style.display = "block";
				}else{
					cardKH[i].style.display = "none";
				}
			}
		}
	}
	
	//<=================================Xem Chi tiết khóa học =====================================================>
	//Tạo mới Thông tin Service
	var thongTinService = new ThongTinService();
	//<=================Lưu vào localStorage mã khóa học khi click vào 1 khóa học bất kỳ=======>
	thongTinService.LuuChiTietKhoaHoc();

	//<====================Load chi tiết khóa học trong trang coursedetail=====================>
	thongTinService.LoadChiTietKhoaHoc();
	thongTinService.TiepTucHoc();
	
	//<================================Load Họ tên lên thanh nav==================================================>
	LoadHoTen();
	function LoadHoTen() {
    var TKJson = localStorage.getItem("ThongTinTK");
    var thongtinTK = JSON.parse(TKJson);
    var HoTen = thongtinTK[0].HoTen;
    $('#TenTK').html(`Welcome ${HoTen}`);
    $('#TenTK2').html(`<i class="fa fa-user">${HoTen}</i>`);
}

	//<=================================Xem thông tin tài khoản===================================================>
	$('#TenTK').click(function(){
		window.location.href = '../../views/user/examples/user.html'
	});
	$("#TenTK2").click(function(){
		window.location.href = '../../views/user/examples/user.html'
	})

	//<==========================Load chi tiết thông tin tài khoản trong trang user ==============================>
	LoadThongTinTK();
	function LoadThongTinTK () {
		//Lấy dữ liệu từ localStorage
		var TKJson = localStorage.getItem("ThongTinTK");
		var thongTinTK = JSON.parse(TKJson);

		var DSNDJson = localStorage.getItem("DanhSachND");
		var thongTinDSND = JSON.parse(DSNDJson);

		for (var i = 0; i < thongTinDSND.length; i++) {
			if (thongTinDSND[i].TaiKhoan === thongTinTK[0].TaiKhoan) {
				var matKhau = thongTinDSND[i].MatKhau;
				var taiKhoan = thongTinDSND[i].TaiKhoan;
				var hoTen = thongTinDSND[i].HoTen;
				var Email = thongTinDSND[i].Email;
				var SoDT = thongTinDSND[i].SoDT;
			}
		}
		
		//Cập nhật vào bảng
		$('#TaiKhoan').val(taiKhoan);
		$('#HoTen').val(hoTen);
		$('#Email').val(Email);
		$('#SoDT').val(SoDT);
		$('#MatKhau').val(matKhau);
		$('#HoTen2').html(hoTen);

	}
});
