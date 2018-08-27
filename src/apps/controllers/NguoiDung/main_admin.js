
//<==========================================Cập nhật thông tin tài khoản Amin ===================================>
//Khởi tạo validation
var validate = new Validation();

//Khởi tạo người dùng service
var nguoiDungService = new NguoiDungService();
//Lấy danh sách người dùng
nguoiDungService.LayDanhSachNguoiDung();

//<==========================================Load thông tin tài khoản Amin=======================================> 
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
		$('#TKAmin').val(taiKhoan);
		$('#NameAmin').val(hoTen);
		$('#EmailAmin').val(Email);
		$('#SoDTAmin').val(SoDT);
		$('#MKAmin').val(matKhau);
		$('#NameAmin2').html(hoTen);
	}
$('#ThongTinAmin').click(LoadThongTinTK());

//Kiểm tra người dùng nhập 
function KiemTraNhap(){
	var taiKhoan = $('#TKAmin').val();
	var matKhau = $('#MKAmin').val();
	var hoTen = $('#NameAmin').val();
	var Email = $('#EmailAmin').val();
	var SoDT = $('#SoDTAmin').val();
	if(!isNaN(hoTen)){
		swal({
  			type: 'error',
  			text: 'Vui Lòng thử lại...',
  			title: 'Họ tên chỉ có thể là chữ !',
			});
		return;	  
	}else if (!validate.KiemTraEmail(Email)){
		swal({
  			type: 'error',
  			text: 'Vui Lòng thử lại...',
  			title: 'Hãy nhập đúng định dạng email. Ví dụ: Examp@gmail.com',
			});
		return;
	}else if (!validate.KiemTraSoDT(SoDT)){
		swal({
  			type: 'error',
  			text: 'Vui Lòng thử lại...',
  			title: 'Số điện thoại phải là số và lớn hơn 10 chữ số',
			});     
            return;
	}else {
    	var nguoiDung = JSON.stringify({
         	TaiKhoan: taiKhoan,
            MatKhau: matKhau,
            HoTen: hoTen,
            Email: Email,
            SoDT: SoDT,
            MaLoaiNguoiDung: 'GV',
            });
    	nguoiDungService.CapNhatThongTinNguoiDung(nguoiDung);
    }	
}

// Cập nhật thông tin tài khoản
$('#btnCapNhatTTAmin').click(function(){
	KiemTraNhap();
});