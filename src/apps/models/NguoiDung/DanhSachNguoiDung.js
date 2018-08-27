function DanhSachNguoiDung()
{
	this.DSND = [];
	this.ThemNguoiDung = function(nguoiDung){
		this.DSND.push(nguoiDung);
	}
}

DanhSachNguoiDung.prototype.LoaiNguoiDung = function(maLoaiNguoiDung,tenLoaiNguoiDung){
	this.MaLoaiNguoiDung = maLoaiNguoiDung;
	this.TenLoaiNguoiDung = tenLoaiNguoiDung;
};

DanhSachNguoiDung.prototype.XoaNhieuNguoiDung = function(lstNDXoa){
	for (var i = 0; i < lstNDXoa.length; i++) {
		for (var j = 0; j < this.DSND.length; j++) {
			var nguoiDung = this.DSND[j];
			if(lstNDXoa[i] == nguoiDung.TaiKhoan){
				this.DSND.splice(j,1);
			}
		}
	}
};

DanhSachNguoiDung.prototype.TimNguoiDungTheoTaiKhoan = function(taiKhoan){
    for(var i =0 ;i< this.DSND.length;i++){
        if(taiKhoan === this.DSND[i].TaiKhoan){
            return i;
        }
    }
}

DanhSachNguoiDung.prototype.XoaMotNguoiDung = function(taiKhoan){
    var index = this.TimNguoiDungTheoTaiKhoan(taiKhoan);
    this.DSND.splice(index,1);
}
