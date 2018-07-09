

$(document).ready(function() {
	var danhSachNguoiDung = new DanhSachNguoiDung();
	var nguoiDungSV = new NguoiDungService();
	LayStorage ();

	function hienPopupNguoiDung(){
		$('#btnPopupModal').trigger('click');
		$('.txtF').val('');
		$('#TaiKhoan').attr('readonly',false);
		var modalTile = "Thêm Người Dùng";
		var modalFooter = 
		`<button id="btnThem" class="btn btn-success">Thêm Người Dùng</button>
		<button id="btnDong" class="btn btn-danger">Đóng</button>`;
		$('.modal-title').html(modalTile);
		$('.modal-footer').html(modalFooter);
	}
	//THêm Người dùng
	
	$('body').delegate('#btnThem', 'click', function() {
		//Lấy thông tin người dùng nhập vào
		var taiKhoan = $('#TaiKhoan').val();
		var matKhau = $('#MatKhau').val();
		var hoTen = $('#HoTen').val();
		var email = $('#Email').val();
		var sodt = $('#SoDT').val();

		//Khởi tạo đối tượng ngườ dùng
		var nguoiDung = new NguoiDung(taiKhoan,matKhau,hoTen,email,sodt,'HV','');
		//Goi  ajax them nguoi dung
		nguoiDungSV.AjaxThemNguoiDung(nguoiDung)
		.done(function(kq){
			console.log(kq);
		})
		.fail(function(kq){
			console.log(kq)
		})

		// danhSachNguoiDung.ThemNguoiDung(nguoiDung);

		// //Hiển thị Sweet Alert
		// swal("OK!", "Thêm người dùng thành công!", "success");

		// //Gọi sự kiện đóng form
		// $('#btnDongForm').trigger('click');

		// //làm mới form
		// $('.txtF').val("");

		// //Load dữ liệu ra dataTable
		// LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);

		// //Vễ biểu đồ
		// var arrDiem = danhSachNguoiDung.TinhDiemNguoiDung();
		// console.log(arrDiem);
		// VeBieuDo(arrDiem);

		// //Lưu và storage
		// LuuStorage();
		// // console.log(localStorage.getItem('DanhSachNguoiDung'))
	});

	//Dong Form
	$('body').delegate('#btnDong', 'click', function() {
		$('#btnDongForm').trigger('click');
	});

	//Load dữ liệu lên dataTable
	function LoadDanhSachNguoiDung(DSND){
		var noiDungDSND = "";
		for(var i = 0; i < DSND.length; i++){
			var nguoiDung = DSND[i];
			noiDungDSND += `
			<tr class="trThongTinNguoiDung" 
			data-taikhoan1="${nguoiDung.TaiKhoan}"
			data-matKhau="${nguoiDung.MatKhau}"
			data-hoTen="${nguoiDung.HoTen}"
			data-email="${nguoiDung.Email}"
			data-soDt="${nguoiDung.SoDT}"
			>
			<td><input class="CkbXoaNguoiDung" type="checkbox" value="${nguoiDung.TaiKhoan}"></td>
			<td>${nguoiDung.TaiKhoan}</td>
			<td>${nguoiDung.MatKhau}</td>
			<td class="tdHoTen">${nguoiDung.HoTen}</td>
			<td>${nguoiDung.Email}</td>
			<td>${nguoiDung.SoDT}</td>
			<td>
			<button class="btn btn-info btnXoa" data-taikhoan="${nguoiDung.TaiKhoan}">Xóa</button>
			<button class="btn btn-warning btnCapNhat" data-taikhoan="${nguoiDung.TaiKhoan}">Sửa</button>
			</td>
			</tr>
			`;
		}
		$('#tbodyDSND').html(noiDungDSND);
	}


	//Tìm kiếm người dùng
	function TimKiemNguoiDung(){
		var tuKhoa = $(this).val();
		var danhSachNguoiDungKQ = danhSachNguoiDung.TimKiemNguoiDung(tuKhoa);
		LoadDanhSachNguoiDung(danhSachNguoiDungKQ.DSND);
		HighLight(tuKhoa);
	}


	function LuuStorage(){
		//Lưu mảng người dùng
		var jsonDSND = JSON.stringify(danhSachNguoiDung.DSND);
		localStorage.setItem("DanhSachNguoiDung",jsonDSND);
	}

	function LayStorage (){
		//Lấy dữ liệu từ LocalStorage
		if (KiemTraTonTai()){
			var ItemLocal = JSON.parse(localStorage.getItem('DanhSachNguoiDung'));
			return ItemLocal;
		}else {
			return[];
		}

		// console.log(jsonDSND);
		// localStorage.removeItem('DanhSachNguoiDung');
	}

	//Hàm kiểm tra tồn tại
	function KiemTraTonTai (argument) {
		var localItem = localStorage.getItem('DanhSachNguoiDung');
		if(localItem !== null){
			return true;
		}
		return false;
	}

	//Xử lý xóa người dùng
	function XoaNguoiDung(){
		$('.CkbXoaNguoiDung').each(function() {
			if($(this).is(':checked')){
				var TaiKhoan = $(this).val();
				danhSachNguoiDung.XoaDanhSachNguoiDung(TaiKhoan);
				Animation();
			}
		})

	}

//Hiệu ứng xóa
	function Animation(){
		swal({
			title: 'Bạn chắc chắn xóa?',
			text: "Bạn sẽ không thể phục hồi!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.value) {
				swal(
					'Thành Công!',
					'Bạn đã xóa thành công!',
					'success'
					)
			LuuStorage();
			LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
			}
		})
	}

	//Tìm kiếm highlight
	function HighLight(tuKhoa){
		//Duyệt tất cả td có class name là tdHoTen
		var doDaiTuKhoa = tuKhoa.trim().length;
		$('.tdHoTen').each(function() {
			var noiDungHTML = $(this).html();
			//Kiểm tra td có chứa từ khóa cần  tìm hay không
			if(noiDungHTML.indexOf(tuKhoa) !==-1){
				//Hàm indexOf là để tìm ra vị trí của "từ khóa" bên trong noiDungHTML
				var viTriTuKhoa = noiDungHTML.indexOf(tuKhoa);
				var ketQuaMoi = `${noiDungHTML.substring(0,viTriTuKhoa)}
				 				<span class='highlight'>${tuKhoa}</span>
				 				${noiDungHTML.substring(viTriTuKhoa + doDaiTuKhoa,)} `;
				$(this).html(ketQuaMoi);		
			}

			// var hoTen = $(this).text();
			// var index = hoTen.trim().toLowerCase().search(tuKhoa.trim().toLocaleLowerCase()); // Tim ra vi tri tu khoa
			// if(index !== -1){
			// 	var chuoi1 = hoTen.substring(0,index);
			// 	var chuoi2 = hoTen.substring(index,tuKhoa.trim().length);
			// 	var chuoi3 = hoTen.substring(index + tuKhoa.trim().length,);
			// 	hoTen = ` ${chuoi1}<span class="highlight">${chuoi2}</span>${chuoi3}
			// 	`;
			// 	$(this).html(hoTen);
			// }			
		});
		$('.highlight').highlight(1000);
	}


	//Plugin Jquery
	window.jQuery.prototype.NhapNhay = function(soLanNhapNhay){
		var This = $(this);
		for(var i = 0; i < soLanNhapNhay;i++){
			This.fadeIn(100);
			This.fadeOut(100);
		}
	}

// $('.nav-link').highlight();


//---------------------------Gọi Hàm -------------------------------
$('#btnThemNguoiDung').click(hienPopupNguoiDung);
$('#txtTuKhoa').keyup(TimKiemNguoiDung);
$('#btnLayDuLieu').click(function(){
	// danhSachNguoiDung.DSND = LayStorage ();
	// LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
	nguoiDungSV.AjaxLayDanhSachNguoiDung()
	.done(function(kq){
		danhSachNguoiDung.DSND = kq;
		LoadDanhSachNguoiDung(kq);
	})
	.fail(function(kq){
		
	})
});
	//Xoa mỗi nút được chọn
	$('body').delegate('.btnXoa', 'click', function() {
		var taiKhoan = $(this).attr('data-taikhoan');
			nguoiDungSV.AjaxXoaNguoiDung(taiKhoan).done(function(){
			danhSachNguoiDung.XoaDanhSachNguoiDung(taiKhoan);
			Animation();
			console.log('Xoa Thanh Cong');
		}).fail(function(kq){
			console.log(kq);
		})
	});
	//Xóa nhiều người dùng đc check
	$('#btnXoaNguoiDung').click(XoaNguoiDung);

	//Lấy thông tin cập nhật
	$('body').delegate('.btnCapNhat', 'click', function() {
		var taiKhoan = $(this).attr('data-taikhoan');
		var viTriCapNhat = danhSachNguoiDung.TimKiemNguoiDungTheoTaiKhoan(taiKhoan);
		danhSachNguoiDung.LayThongTinNguoiDung(viTriCapNhat);

		//Triệu hồi Popup xuất hiện
		$('#btnPopupModal').trigger('click');
		var modalTile = "Cập Nhật Người Dùng";
		var modalFooter = 
		`<button id="btnCapNhatND" class="btn btn-success">Cập Nhật</button>
		<button id="btnDong" class="btn btn-danger">Đóng</button>`;
		$('.modal-title').html(modalTile);
		$('.modal-footer').html(modalFooter);

		//Khoa Value Tai Khoan
		$('#TaiKhoan').attr('readonly',true);
		$('#TaiKhoan').css('cursor','not-allowed');
	});


	//Xử lý cập nhật dữ liệu
	$('body').delegate('#btnCapNhatND', 'click', function() {
		var taiKhoan = $('#TaiKhoan').val();
		var matKhau = $('#MatKhau').val();
		var hoTen = $('#HoTen').val();
		var email = $('#Email').val();
		var soDT = $('#SoDT').val();

		//Tạo đối tượng lấy dữ liệu sau khi người dùng thay đổi 
		var nguoiDungEdit = new NguoiDung(taiKhoan,matKhau,hoTen,email,soDT);
			nguoiDungSV.AjaxSuaNguoiDung(nguoiDungEdit).done(function(kq){
			danhSachNguoiDung.CapNhatThongTinNguoiDung(nguoiDungEdit);	
			LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
			console.log(kq);
		}).fail(function(kq){
			console.log(kq);
		})

		

		//Hiển thị Sweet Alert
		swal("OK!", "Cập Nhật thông tin thành công!", "success");
		//Gọi sự kiện đóng form
		$('#btnDongForm').trigger('click');
		//Clear dữ liệu
	});


//<======================================================================================================================>
//Khóa học
// CKEDITOR.replace( 'txtMota',{
// 	allowedContent:'iframe[*]',
// });

// $('#btnThemKhoaHoc').click(function(){
// 	var maKH = $('#txtMaKH').val();
// 	var tenKH = $('#txtTenKH').val();
// 	var moTa = CKEDITOR.instances['txtMoTa'].getData();
// 	var hinhAnh 
// 	var luoiXem 
// 	var nguoiTao 
	
// })

// function LayDanhSachGiaoVu(){
// 	nguoiDungSV.AjaxLayDanhSachNguoiDung()
// 	.done(function(kq){
// 		console.log(kq);
// 		var option = '';
// 		for(var i=0; i < kq.length; i++){
// 			if(kq[i].MaLoaiNguoiDung === 'GV'){
// 				option += `<option>${kq[i].TaiKhoan}</option>`;
// 			}
// 		}
// 		$('#nguoiTao').html(option);
// 	}).fail(function(){

// 	})
// }


//<========================================================================================================================>
//Biểu đồ
function VeBieuDo(arrDiem){
Highcharts.chart('myChart', {

    title: {
        text: 'Biểu đồ điểm người dùng'
    },

    subtitle: {
        text: 'Source: thesolarfoundation.com'
    },

    yAxis: {
        title: {
            text: 'Number of Employees'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: [{
        name: 'Installation',
        data: arrDiem
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

})};
});