function DanhSachNguoiDung()
{
	this.DSND = [];
	this.ThemNguoiDung = function(nguoiDung){
		this.DSND.push(nguoiDung);
	}
}

DanhSachNguoiDung.prototype.TimKiemNguoiDung = function(tuKhoa){
	//Loai bo khoang trắng đầu cuối
	tuKhoa = tuKhoa.trim();
	//Chuyển chuỗi thành chữ thường
	tuKhoa = tuKhoa.toLowerCase();

	//Tạo đối tượng danh sách người dùng KQ
	var danhSachNguoiDungKQ = new DanhSachNguoiDung();

	for( var i = 0; i < this.DSND.length; i++){
		var nguoiDung = this.DSND[i];
		if(nguoiDung.HoTen.toLowerCase().trim().search(tuKhoa) !== -1){
			danhSachNguoiDungKQ.ThemNguoiDung(nguoiDung);
		}
	}
	return danhSachNguoiDungKQ;
};

//Tìm người dùng theo Tài khoản
DanhSachNguoiDung.prototype.TimKiemNguoiDungTheoTaiKhoan = function(TaiKhoan){
	for(var i = 0; i < this.DSND.length ;i++){
		var nguoiDung = this.DSND[i];
		//So sánh người dùng trong mảng và taikhoan thì trả ra giá trị index
		if(nguoiDung.TaiKhoan === TaiKhoan){
			return i;
		}
	}
};

//Phương thức xóa danh sách người dùng
DanhSachNguoiDung.prototype.XoaDanhSachNguoiDung = function(TaiKhoan){
	var index = this.TimKiemNguoiDungTheoTaiKhoan(TaiKhoan); //Goi ra vi tri tu phuong thuc tim theo TK
	this.DSND.splice(index,1);
};

//Phương thức lấy thông tin người dùng
DanhSachNguoiDung.prototype.LayThongTinNguoiDung = function(viTriCapNhat){
	var ThongTinNguoiDung = this.DSND[viTriCapNhat];
	var taiKhoan = ThongTinNguoiDung.TaiKhoan;
	var matKhau = ThongTinNguoiDung.MatKhau;
	var hoTen = ThongTinNguoiDung.HoTen;
	var email = ThongTinNguoiDung.Email;
	var soDT = ThongTinNguoiDung.SoDT;
	var nguoiDung = new NguoiDung(taiKhoan,matKhau,hoTen,email,soDT);
		$('#TaiKhoan').val(nguoiDung.TaiKhoan);
		$('#MatKhau').val(nguoiDung.MatKhau);
		$('#HoTen').val(nguoiDung.HoTen);
		$('#Email').val(nguoiDung.Email);
		$('#SoDT').val(nguoiDung.SoDT);

};

//Phương thức chỉnh sửa người dùng
DanhSachNguoiDung.prototype.CapNhatThongTinNguoiDung = function(nguoiDungEdit){
	//Tìm vị trí người dùng trong mảng DSND
	var index = this.TimKiemNguoiDungTheoTaiKhoan(nguoiDungEdit.TaiKhoan);
	var DSCapNhat = this.DSND[index];
	DSCapNhat.MatKhau = nguoiDungEdit.MatKhau;
	DSCapNhat.HoTen = nguoiDungEdit.HoTen;
	DSCapNhat.Email = nguoiDungEdit.Email;
	DSCapNhat.SoDT = nguoiDungEdit.SoDT;

	
};

DanhSachNguoiDung.prototype.TinhDiemNguoiDung = function(){
	var arrDiem = [];
	for(var i = 0 ; i < this.DSND.length ; i++){
		arrDiem.push(this.DSND[i].Diem);
	}
	return arrDiem;
};