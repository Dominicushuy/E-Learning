$(document).ready(function() {

//khởi tạo danh sách khóa học
var danhSachKhoaHoc = new DanhSachKhoaHoc();

//Khởi tạo khóa học service
var khoaHocService = new KhoaHocService();

//Khoi tao doi tuong Nguoi Dung services;
var nguoiDungService = new NguoiDungService();

//<====================================================Local Storage ================================================>
function LuuStorage(){
        var ItemLocal = JSON.stringify(danhSachKhoaHoc.DSKH);
        localStorage.setItem('DanhSachKH',ItemLocal)
    }

function GetLocal(){
// localStorage.removeItem('DanhSachNguoiDung')
if(KiemTraTonTai()){
    var ItemLocal = JSON.parse(localStorage.getItem('DanhSachKH'));
         return ItemLocal;
        }
    return []; 
    }

//Hàm kiểm tra tồn tại
function KiemTraTonTai(){
    var localItem = localStorage.getItem('DanhSachKH');
    if(localItem !== null){
        return true;
    }
    return false;
}
//<=============================================== Load danh sách lên table ====================================>
//Lấy danh sách giáo vụ
	function LayDSGV(){
		nguoiDungService.AjaxLayDanhSachNguoiDung()
		.done(function(DSND){
			//Load DSND len the Select
			var noiDung = '';
			for (var i = 0; i < DSND.length; i++) {
				var nguoiDung = DSND[i];
				if(nguoiDung.MaLoaiNguoiDung ==="GV"){
					noiDung +=`
					<option value="${nguoiDung.TaiKhoan}">${nguoiDung.HoTen}</option>
					`;
				}
			}
			$('#NguoiTao').html(noiDung);

		}).fail(function(error){
			console.log(error);
		})
	}

//Load table Danh sách khóa học
	function LoadTableDSKH(DSKH){
		var noiDung = '';
		for (var i = 0; i < DSKH.length; i++) {
			var khoaHoc = DSKH[i];
			noiDung += `
			<tr class="trKhoaHoc">
			<td><input type="checkbox" class="ckbMaKhoaHoc" value="${khoaHoc.MaKhoaHoc}"/></td>
			<td class="MaKhoaHoc">${khoaHoc.MaKhoaHoc}</td>
			<td class="TenKhoaHoc">${khoaHoc.TenKhoaHoc}</td>
			<td class="MoTa d-none">${khoaHoc.MoTa}</td>
			<td ><button class="btn btn-danger btnXemChiTiet" data-video="" data-toggle="modal" data-target="#videoModal" MaKhoaHoc="${khoaHoc.MaKhoaHoc}"><i class="fa fa-caret-square-o-down"></i></button></td>
			<td class="LuotXem">${khoaHoc.LuotXem}</td>
			<td class="HinhAnh"><img src="${khoaHoc.HinhAnh}" width="50" height="50"></td>
			<td clas="NguoiTao">${khoaHoc.NguoiTao}</td>
			<td><button class="btn btn-dark btnXoa" MaKhoaHoc="${khoaHoc.MaKhoaHoc}"><i class="fa fa-trash"></i></button>
			<button class="btn btn-warning btnChinhSua" MaKhoaHoc="${khoaHoc.MaKhoaHoc}"><i class="fa fa-pencil-square-o"></i></button>
			</td>
			</tr>
			`;
		}
		$('#tbodyDSKH').html(noiDung);
	};

	LoadDanhSachKhoaHoc();
	function LoadDanhSachKhoaHoc(){
		khoaHocService.LayKhoaHoc()
		.done(function(DSKH){
			danhSachKhoaHoc.DSKH = DSKH;
			LoadTableDSKH(danhSachKhoaHoc.DSKH);
		}).fail(function(kq){

		})
		LayDSGV()
	};


//<=============================================== Chỉnh sửa khóa học ==============================================>
//CK editor
	CKEDITOR.replace( 'MoTa',{
		allowedContent: 'iframe[*]'
	} );
//Load lên popup Chỉnh Sửa
	$('body').delegate('.btnChinhSua', 'click', function() {
				//Khóa input Mã Khóa học
		$('#MaKhoaHoc').attr("readonly",true);

		var modalTile = "Chỉnh Sửa Khóa Học";
		var modalFooter = 
		`<button id="btnLuu" class="btn btn-success">Lưu</button>
		<button id="btnDong" class="btn btn-danger">Đóng</button>`;
		$('.modal-title').html(modalTile);
		$('.modal-footer').html(modalFooter);
		//Load phần nội dung lên popup
		var trKhoaHoc = $(this).closest('.trKhoaHoc');
		var MaKhoaHoc = trKhoaHoc.find(".MaKhoaHoc").html().trim();
		var TenKhoaHoc = trKhoaHoc.find(".TenKhoaHoc").html().trim();
		var MoTa = trKhoaHoc.find(".MoTa").html().trim();
		var LuotXem = trKhoaHoc.find(".LuotXem").html().trim();
		var HinhAnh = trKhoaHoc.find("img").attr("src");
		var NguoiTao = trKhoaHoc.find(".NguoiTao").html();

		$("#MaKhoaHoc").val(MaKhoaHoc);
		$("#TenKhoaHoc").val(TenKhoaHoc);
		CKEDITOR.instances["MoTa"].setData(MoTa)
		$("#LuotXem").val(LuotXem);
		$("#HinhAnh").val(HinhAnh);
		$("#NguoiTao").val(NguoiTao);
		$("#btnPopupModal").trigger('click');

		console.log(HinhAnh);
	});

//Lưu Cập nhật khóa học
	$('body').delegate('#btnLuu', 'click', function() {
		//Lấy thông tin người dùng cập nhật
		var MaKhoaHoc = $('#MaKhoaHoc').val();
		var TenKhoaHoc = $("#TenKhoaHoc").val();
		var MoTa = CKEDITOR.instances["MoTa"].getData();
		var LuotXem = $("#LuotXem").val();
		var TenKhoaHoc = $("#TenKhoaHoc").val();
		var HinhAnh = $("#HinhAnh").val();
		var NguoiTao = $('#NguoiTao').val();

		var khoaHoc = new KhoaHoc(MaKhoaHoc,TenKhoaHoc,MoTa,HinhAnh,LuotXem,NguoiTao);

		khoaHocService.CapNhatKhoaHoc(khoaHoc).done(function(result){
			console.log(result);
			swal({
                position: 'center',
                type: 'success',
                title: 'Cập Nhật thành công',
                showConfirmButton: false,
                timer: 1000
                });
			$('#MaKhoaHoc').attr("readonly",false);
			LuuStorage();
			LoadDanhSachKhoaHoc();
			setTimeout(function(){window.location.reload()}, 1000);
		}).fail(function(error){
			console.log(error);
		});

		//Clear dữ liệu input
           ClearForm()
		
	});
//Dóng form
$('body').delegate('#btnDong', 'click', function() {
	$('.close').trigger('click');
	//Clear dữ liệu input
    ClearForm();
});
$('.close').click(function(){
	ClearForm();
})

function ClearForm(){
	$('.modal-body input').val('');
    $('#MaKhoaHoc').attr("readonly",false);
    $('#MaKhoaHoc').css("cursor","text");
    CKEDITOR.instances["MoTa"].setData("");
}

//<====================================================== Xóa khóa học ===============================================>
//<------------------------------------------------Xóa một khóa học Khóa Học ----------------------------------------->
	$('body').delegate('.btnXoa', 'click', function() {
		var id = $(this).attr("MaKhoaHoc");
		swal({
            title: 'Bạn muốn xóa?',
            text: "bạn sẽ không thể khôi phục file này!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              //Confirm Xóa
              khoaHocService.XoaKhoaHoc(id).done(function(){
                    swal(
                    'Thành Công',
                    'Bạn đã xóa thành công',
                    'success'
                    );
                    console.log("xóa thành công");
                  LuuStorage();
                  LoadDanhSachKhoaHoc();
                setTimeout(function(){window.location.reload()}, 700);
              }).fail(function(kq){
                console.log(kq)
                swal({
                type: 'error',
                text: 'Vui Lòng thử lại...',
                title: 'không thể xóa khóa học đã được ghi danh !',
                }); 
              })
              
            }
          })
	});
 

//<-------------------------------------------------Xóa nhiều khóa học được chọn------------------------------------->
$('#btnXoaKhoaHoc').click(function(){
var mangKhoaHoc = [];
var lstChecked = $('.ckbMaKhoaHoc');
for (var i = 0; i < lstChecked.length; i++) {
        if (lstChecked[i].checked) {
            mangKhoaHoc.push(lstChecked[i].value);
        }
        if(mangKhoaHoc.length > 0){
            swal({
            title: 'Bạn muốn xóa?',
            text: "bạn sẽ không thể khôi phục file này!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
                })
            .then((willDelete) => {
                if (willDelete) {
                LuuStorage()
                XoaNhieuKhoaHoc();
                
                }
            });   
        }else {
            swal({
                type: 'error',
                text: 'Vui Lòng thử lại...',
                title: 'Vui lòng chọn khóa học cần xóa !',
                }); 
        }
    }  

})

function XoaNhieuKhoaHoc () {
    var mangKhoaHoc = [];
    var lstChecked = $('.ckbMaKhoaHoc');

    for (var i = 0; i < lstChecked.length; i++) {
        if (lstChecked[i].checked) {
            mangKhoaHoc.push(lstChecked[i].value);
            // Xóa sinh viên trên server
            khoaHocService.XoaKhoaHoc(lstChecked[i].value).done(function(kq){
                LuuStorage();
                swal({
                    position: 'center',
                      type: 'success',
                    title: 'Xóa thành công',
                    showConfirmButton: false,
                    timer: 1000
                    });
                LoadDanhSachKhoaHoc();
                setTimeout(function(){window.location.reload()}, 1200); 
            }).fail(function(kq){
                console.log(kq);
                swal({
                type: 'error',
                text: 'Vui Lòng thử lại...',
                title: 'Không thể xóa khóa học đã được ghi danh !',
                }); 

            });
        }
    }
   	
    
}

//<======================================================= Thêm khóa học ============================================>

//Load lên Popup Thêm
	$('#btnTaoKhoaHoc').click(OpenPopupModal);

	function OpenPopupModal(){
		$('#btnPopupModal').trigger('click');
		$('.txtF').val('');

		var modalTile = "Thêm Khóa Học";
		var modalFooter = 
		`<button id="btnTaoMoi" class="btn btn-success">Thêm Khóa Học</button>
		<button id="btnDong" class="btn btn-danger">Đóng</button>`;
		$('.modal-title').html(modalTile);
		$('.modal-footer').html(modalFooter);
	}
	$('body').delegate('#btnDong', 'click', function() {
		$('.close').trigger('click');
	});

//Tạo mới khóa học
$('body').delegate('#btnTaoMoi', 'click', function(){
		//Lấy thông tin người dùng nhập vào
		var MaKhoaHoc = $('#MaKhoaHoc').val();
		var TenKhoaHoc = $('#TenKhoaHoc').val();
		var MoTa = CKEDITOR.instances["MoTa"].getData();;
		var LuotXem = $('#LuotXem').val();
		var HinhAnh = $('#HinhAnh').val();
		var NguoiTao = $('#NguoiTao').val();
		

	//Khởi tạo đối tượng khóa học
		var khoaHoc	= new KhoaHoc(MaKhoaHoc,TenKhoaHoc,MoTa,HinhAnh,LuotXem,NguoiTao);

		console.log(khoaHoc);
	//Gọi service để đẩy dữ liệu lên server
		khoaHocService.ThemKhoaHoc(khoaHoc).done(function(result){
			console.log(result);
			swal({
	            position: 'center',
	             type: 'success',
	            title: 'Thêm thành công',
	            showConfirmButton: false,
	            timer: 1000
	            });
			LuuStorage();
			LoadDanhSachKhoaHoc();
            setTimeout(function(){window.location.reload()}, 1200); 
		}).fail(function(error){
			console.log(error);
			swal("Oops", "Khóa học đã tồn tại!", "error");
		})		

});
//<==================================================Tìm kiếm Khóa học ==================================================>

//Tìm kiếm theo tên
$('#txtTimKiem').keyup(function() {
    var value = $(this).val().toUpperCase().trim();
    var trTable = $('tr');
    for (var i = 0; i < trTable.length; i++) {
        tdTable = trTable[i].getElementsByTagName('td')[2];
        if(tdTable){
            if(tdTable.innerHTML.toUpperCase().indexOf(value) >-1){
                trTable[i].style.display = "";
            }else {
                trTable[i].style.display = "none";
            }
        }
    }

});

//<==================================================== Load mô tả =====================================================>
$('body').delegate('.btnXemChiTiet', 'click', function() {
	var maKhoaHoc = $(this).attr('MaKhoaHoc');
	localStorage.setItem("MaKhoaHoc", maKhoaHoc);
	window.location.href = '../../coursedetail/coursedetail.html';
	
});


//<==================================================== Ghi danh khóa học ============================================>
//Load popup Ghi danh
$('#btnGhiDanh').click(function(){
	//Load popup
	$('#popupGhiDanhKH').trigger('click');
	LayDSKH();
	LayDSND();

});

//Luu local ma	
function LocalMa(){
$('.MaKH').each(function() {
	if(this.selected){
	var maKH = $(this).attr('MaKhoaHoc');
	var localmaKH = JSON.stringify(maKH);
	localStorage.setItem('MaKhoaHoc', localmaKH);
	}
	});
$('.MaND').each(function() {
	if(this.selected){
	var Tk = $(this).attr('MaTaiKhoan');
	var localTk = JSON.stringify(Tk);
	localStorage.setItem('MaHocVien', localTk);
	}
});
}

//Thực hiện ghi danh
$('#GhiDanh').click(function(){
	LocalMa();
	var maKH = JSON.parse(localStorage.getItem('MaKhoaHoc'));
	var Tk = JSON.parse(localStorage.getItem('MaHocVien'));

	// Tạo tk json gửi lên server
	var TKJson = JSON.stringify({MaKhoaHoc: maKH, TaiKhoan: Tk});
	// Xử lý Ajax ghi danh
	GhiDanhKhoaHoc(TKJson);
	
})


function GhiDanhKhoaHoc(dataTK){
	var urlAPI ='http://sv.myclass.vn/api/QuanLyTrungTam/GhiDanhKhoaHoc';

		$.ajax({
		 	url: urlAPI,
		 	type: 'POST',
		 	contentType: "application/json",
		 	data: dataTK
		 })
		 .done(function(kq) {
		 	console.log(kq)
		 		swal({
					position: 'center',
					type: 'success',
					title: 'Ghi danh thành công !!!',
					showConfirmButton: false,
					timer: 1000
			    });
			$('.close').trigger('click');    
		 })
		 .fail(function(kq){
		 	console.log(kq)
		 	swal({
					type: 'error',
					title: 'Bạn đã ghi khóa học này rồi !!!',
			 });
		 })
}	

function LayDSKH(){
	khoaHocService.LayKhoaHoc().done(function(DSKH){
		var noiDung = '';
		for (var i = 0; i < DSKH.length; i++) {
			var khoaHoc = DSKH[i];
			noiDung+=`
			<option value="${khoaHoc.TenKhoaHoc}" MaKhoaHoc="${khoaHoc.MaKhoaHoc}" class="MaKH">${khoaHoc.TenKhoaHoc}</option>
			`;
		}	
	$('#TenKH').html(noiDung);
	}).fail(function(){
		console.log(kq)
	});
	
}
function LayDSND(){
	nguoiDungService.AjaxLayDanhSachNguoiDung().done(function(DSND){
		var noiDung = '';
		for (var i = 0; i < DSND.length; i++) {
			var nguoiDung = DSND[i];
			noiDung+=`
			<option value="${nguoiDung.HoTen}" MaTaiKhoan="${nguoiDung.TaiKhoan}" class="MaND">${nguoiDung.HoTen}</option>
			`;
		}	
	$('#TenND').html(noiDung);
	}).fail(function(){
		console.log(kq)
	})
	
}
			
		


});