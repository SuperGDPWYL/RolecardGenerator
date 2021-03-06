$(document).ready(function(){
	$('.input').each(function(){
		$(this).keyup(update);
	});
	$('.colorpicker').change(update);
	$('#submit').click(generate);
});
function update()
{
	$('.input').each(function(){
		//Color pickers
		if (this.name=='alignment')
		{
			var val = this.value;
			var numWords = val.split(' ').length;
			var numPickers = $('.alignmentcolors').length;
			if (numWords < numPickers)
			{
				var num =  numPickers - numWords;
				for (i=0;i<num;i++)
				{
					$('#pickers input:last-child').remove();
				}
			}
			else if (numWords > numPickers)
			{
				//More words than pickers, add one.
				var num = numWords - numPickers;
				for (i=0;i<num;i++)
				{
					var picker = $('<input class="colorpicker alignmentcolors" type="color" value="#FFFFFF"/>');
					$('#pickers').append(picker);
					picker.change(update);
				}
			}
		}
		var value = this.value;
		if (value.indexOf('\n') != -1)
		{
			value = value.split('\n').join('</li><li>');
		}
		var edit = this.name;
		edit = $('#'+edit)[0];
		if (this.name.indexOf('id') != -1)
		{
			$(edit).html('<li>'+value+'</li>');
		}
		else if (this.name == 'alignment')
		{
			var color = $('#namecolor').val();
			var words = value.split(' ');
			var [alMajor, ...alMinor] = value.split(' ');
			/*var pickers = $('.alignmentcolors');
			for (i in words)
			{
				if(i==1) words[i] = '<span style="color:'+pickers[0].value+'>(</span><span style="color:'+pickers[i].value+'">'+words[i]+'</span><span style="color:'+pickers[0].value+'>)</span>'; else words[i] = '<span style="color:'+pickers[i].value+'">'+words[i]+'</span>';
				console.log(i);
				console.log(i==1);
			}*/
			value = words.join(' ');
			if(alMinor.length) {
				alMinor = " (<span style='color:#49a9d0'>"+alMinor.map(capitalize).join(' ')+"</span>)";
			} else {
				alMinor = "";
			}
			value = "<span style='color:" + color + "'>" + capitalize(alMajor) + alMinor + "</span>";
			$(edit).html(value);
		}
		else if (this.name == 'rolename')
		{
			var color = $('#namecolor').val();
			$(edit).html('<span style="color:'+color+'">'+value+'</span>');
			//$(edit).html(format(value, color));
		}
		else
		{
			$(edit).html(value);
		}
		
	});
}
function generate()
{
	var rolecard = $('.rolecard')[0];
	html2canvas(rolecard,{
		onrendered: function(canvas){
			document.body.innerHTML = '';
			document.body.appendChild(canvas);
			var msg = $("<div class='message'><p>Image created successfully! Click <a id='imglink' href='#'>here</a> to download it.</p><p>Alternatively, right-click the rolecard to the left and select 'save as'.</div>");
			$('body').append(msg);
			var img = canvas.toDataURL();
			$('#imglink')[0].href = img;
			$('#imglink')[0].download = "myrole.png";
		}
	});
}
function capitalize(str) {
	var strings = str.split(' ');
	str = '';
	for (x = 0; x < strings.length; x++) {
		strings[x] = strings[x].substring(0, 1).toUpperCase() + strings[x].substring(1, strings[x].length) + ' ';
		str += strings[x];
	}

	return str.trim();
}

function format(str, color) {
	if (color == undefined) {
		color = 'black';
	}
	var strings = str.split(' ');
	str = '';
	for (x = 0; x < strings.length; x++) {
		strings[x] = strings[x].substring(0, 1).toUpperCase() + strings[x].substring(1, strings[x].length) + ' ';
		str += strings[x];
	}
	return "<h2 style='color:" + color + "'>" + str + '</h2>';
}
