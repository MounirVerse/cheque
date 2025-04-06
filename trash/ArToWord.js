
		$(document).ready(function() {
			var th = ['','ألف','مليون', 'مليار','تريليون'];
			var dg = ['صفر','واحد','اثنان','ثلاثة','أربعة', 'خمسة','ستة','سبعة','ثمانية','تسعة'];
			var tn = ['عشرة','أحد عشر','اثنا عشر','ثلاثة عشر', 'أربعة عشر','خمسة عشر','ستة عشر', 'سبعة عشر','ثمانية عشر','تسعة عشر'];
			var tw = ['عشرون','ثلاثون','أربعون','خمسون', 'ستون','سبعون','ثمانون','تسعون'];
			$("#credit").on('input', function() {
				var s = $(this).val();
				s = s.toString();
				s = s.replace(/[\, ]/g,'');
				if (s != parseFloat(s)) {
					$("#credit-letter").html('ليس رقمًا صحيحًا');
					return;
				}
				var x = s.indexOf('.');
				if (x == -1)
					x = s.length;
				if (x > 15) {
					$("#credit-letter").html('الرقم كبير جدًا');
					return;
				}
				var n = s.split('');
				var str = '';
				var sk = 0;
				for (var i=0; i<x; i++) {
					if ((x-i)%3==2) {
						if (n[i] == '1') {
							str += tn[Number(n[i+1])] + ' ';
							i++;
							sk=1;
						} else if (n[i]!=0) {
							str += tw[n[i]-2] + ' ';
							sk=1;
						}
					} else if (n[i]!=0) { // 0235
						//str += dg[n[i]] +' ';
						if ((x-i)%3==0) str += 'مئة ';
						sk=1;
					}
					if ((x-i)%3==1) {
						if (sk)
							str += th[(x-i-1)/3] + ' ';
						sk=0;
					}
				}
				if (x != s.length) {
					var y = s.length;
					str += 'فاصلة ';
					for (var i=x+1; i<y; i++)
						str += dg[n[i]] +' ';
				}
					
				//$("#credit-letter").html(str +  'دينار جزائري');
				// $("#credit-letter").html(str + ' دينار جزائري');
				$("#credit-letter").val(str + " دينار جزائري ");

				//test=document.getElementById("credit-letter").value += " دينار جزائري ";

				console.log(str + ' دينار جزائري');
				
			});
		});
	