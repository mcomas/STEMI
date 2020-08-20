var dictio = [];
dictio.active = 'eng';

var lang1 = [], lang2 = [], lang3 = [];
var labels_to_translate = ['l_covariates'];

lang1['global'] = {'l_main_title': "STEMI Calculator",
                   'l_main_subtitle': "STEMI diagnosis-guire cross time prediction calculator",
                  'l_calculate_value': "STEMI diagnosis-guire cross time",
                  'l_clean_button' : "Clean form",
                  'l_yes' : 'Yes',
                  'l_no' : 'No',
                  'l_cat' : 'Catalan',
                  'l_esp' : 'Spanish',
                  'l_eng' : 'English',
                  'l_instructions' : 'Instructions'};

lang1['covariates'] = {'title' : 'Covariates',
                      'l_distance' : 'Distance from PCI center',
                      'l_sex' : 'Sex',
                      'l_sex_female' : 'Woman',
                      'l_sex_male' : 'Man',
                      'l_comarcal' : 'Hospital without PCI',
                      'l_high_killip' : 'Killip class higher than 2',
                      'l_cabg' : 'Prior cardiac bypass graft',
                      'l_pcm' : 'First medical contact',
                      'l_sem' : 'Emergency medical services',
                      'l_domicili' : 'Home care',
                      'l_cap' : 'Primary care',
                    'l_lateral' : 'Lateral myocardial infarction',
                  'l_subite' : 'Out hospital cardiac arrest'};
lang1['instructions'] = '<h1>Instructions</h1> <p><i>In construction</i></p><hr>';
//lang1['instructions'] += '<p>Familial hypercholesterolemia (FH) is an inherited autosomal dominant disorder associated with high incidence of atherosclerotic cardiovascular diseases (ASCVD). However, complications of FH are largely preventable by reducing risk factor levels. An accurate assessment of an individual’s cardiovascular risk would help to optimize the intensity of drug therapies and lifestyle management in this population.</p>';
//lang1['instructions'] += '<p>The SIDIAP-FHP score estimates the 5-year probability of presenting an atherosclerotic cardiovascular event (myocardial infarction, angina, ischemic stroke, or peripheral artery disease) in persons with FH phenotype*. <b>This risk should always be discussed with a physician</b>. For individuals aged 18 years or older with FH phenotype, this simple programme asks for some necessary information.</p>';
//lang1['instructions'] += '<p>For <b>those individuals who have never suffered a previous ASCVD</b>, the SIDIAP-FHP requires just 7 basic items of information about you: sex, age, smoker (yes or no), diabetic (yes or no), hypertension (yes or no), and blood low density lipoprotein concentration (LDL) (in mg/dL)</p>';
//lang1['instructions'] += '<p>For <b>those individuals with previous ASCVD</b>, the SIDIAP-FHP requires: age, diabetes (yes or no), smoking (yes or no), and characteristics of the previous disease: whether it was progressive (more than one episode of hospitalization due to that ASCVD) or not, recent (if last hospitalization was less than one year from now), polyvascular (if more than one vascular territory is affected), or included myocardial infarction.</p>';
//lang1['instructions'] += '<p style = "font-size: 10px;">* FH phenotype is defined as untreated LDL-C >230 mg/dL for 18- to 29-year-olds; >238 mg/dL for 30- to 39-year-olds; >260 mg/dL for 40- to 49-year-olds; and >255 mg/dL for participants older than 49 years.</p>';

dictio['eng'] = lang1;

lang2['global'] = {'l_main_title': "SIDIAP-FHP Score",
                  'l_calculate_value': "Calcula el risc",
                  'l_clean_button' : "Neteja el formulari",
                  'l_yes' : 'Si',
                  'l_no' : 'No',
                  'l_cat' : 'Català',
                  'l_esp' : 'Castellà',
                  'l_eng' : 'Anglès'};

lang2['covariates'] = {'title' : 'Covariables',
                      'l_distance' : 'Distance to angioplasty center',
                      'l_sex' : 'Sex',
                      'l_sex_female' : 'Woman',
                      'l_sex_male' : 'Man',
                      'l_comarcal' : 'Hospital with hemodynamics',
                      'l_high_killip' : 'High killip',
                      'l_cabg' : 'Coronary bypass surgery'};

dictio['cat'] = lang2;

lang3['global'] = {'l_main_title': "SIDIAP-FHP Score",
                  'l_calculate_value': "Calcula el riesgo",
                  'l_clean_button' : "Limpia el formulario",
                  'l_yes' : 'Si',
                  'l_no' : 'No',
                  'l_cat' : 'Catalan',
                  'l_esp' : 'Español',
                  'l_eng' : 'Inglés'};

lang3['covariates'] = {'title' : 'Covariables',
                       'l_distance' : 'Distance to angioplasty center',
                      'l_sex' : 'Sex',
                      'l_sex_female' : 'Woman',
                      'l_sex_male' : 'Man',
                      'l_comarcal' : 'Hospital with hemodynamics',
                      'l_high_killip' : 'High killip',
                      'l_cabg' : 'Coronary bypass surgery'};

dictio['esp'] = lang3;

function get_text(field, sub){
  return dictio[dictio.active][field][sub];
}
function get_instructions(){
  return dictio[dictio.active]['instructions'];
}

var state = [];
var intervention = [];

translate_labels = function(){
  labs = dictio[dictio.active]
  $("#recent").attr('title', get_text('global', 'desc_recent'));
  $("#progressive").attr('title', get_text('global', 'desc_progressive'));
  $("#polivascular").attr('title', get_text('global', 'desc_polivascular'));
  $("#age_value").attr('placeholder', get_text('covariates', 'desc_age'));
  $("#colldl_value").attr('placeholder', get_text('covariates', 'desc_colldl'));
  for(var i in labs){
    console.log(i);
    if (labs.hasOwnProperty(i)){
      for(var j in labs[i]){
        if (labs[i].hasOwnProperty(j) & j.substring(0, 2) == 'l_'){
          console.log(j);
          $('*[id*=' + j +']').each(function() {
	    $(this).html(get_text(i, j));
	  });
          //console.log($('[id=' + j + ']').html());
          //new_text = $('#' + j).html().replace(j, get_text(i, j));
          //$('#' + j).html(new_text);
        }
      }
    }
  }
}

function refresh_covariates(){
  return '-1';
}

function calculate_value_fixed(x_smoking, x_cv, x_colldl){
  x_age = Number($('#age_value').val());
  x_ami = Number($('#ami_yes').prop('checked'));
  x_progressive = Number($('#progressive_yes').prop('checked'));
  x_polivascular = Number($('#polivascular_yes').prop('checked'));
  x_recent = Number($('#recent_yes').prop('checked'));
  x_diabetes = Number($('#diabetes_yes').prop('checked'));
  x_male = Number($('#sex_male').prop('checked'));
  x_htn = Number($('#htn_yes').prop('checked'));


  if(x_cv == 1){
    y_yes = 0.012 * x_age + 0.335 * x_ami + 0.501 * x_progressive + 0.617 * x_recent + 0.375 * x_polivascular + 0.441 * x_diabetes + 0.445 * x_smoking;
    risk = 100 * (1 - Math.pow(0.911628151, Math.exp(y_yes)));
  }
  if(x_cv == 0){
    y_no = 0.046 * x_age + 0.525 * x_male + 0.576 * x_diabetes + 0.485 * x_htn + 0.657 * x_smoking + 0.0028 * x_colldl;
    risk = 100 * (1 - Math.pow(0.999094171, Math.exp(y_no)));
  }

  return risk;
}
function check_form(){
  
  error = false;
  error_message = "";

  x_distance = Number($('#distance_value').val());
  if(x_distance == 0 | isNaN(x_distance)){
    error = true;
    error_message = error_message + "<li>Please, fill <b>" + get_text('covariates', 'l_distance') + "</b> field correctly.</li>";
  }
  
  x_pcm = $('#pcm_sem').prop('checked') | $('#pcm_domicili').prop('checked') | $('#pcm_cap').prop('checked') | $('#pcm_comarcal').prop('checked');
  if(!x_pcm){
    error = true;
    error_message = error_message + "<li>Choose an option for <b>" + get_text('covariates', 'l_pcm') + "</b></li>";
  }

  x_subite = $('#subite_yes').prop('checked') | $('#subite_no').prop('checked');
  if(!x_subite){
    error = true;
    error_message = error_message + "<li>Choose an option for <b>" + get_text('covariates', 'l_subite') + "</b></li>";
  }

  x_cabg = $('#cabg_yes').prop('checked') | $('#cabg_no').prop('checked');
  if(!x_cabg){
    error = true;
    error_message = error_message + "<li>Choose an option for <b>" + get_text('covariates', 'l_cabg') + "</b></li>";
  }

  x_high_killip = $('#high_killip_yes').prop('checked') | $('#high_killip_no').prop('checked');
  if(!x_high_killip){
    error = true;
    error_message = error_message + "<li>Choose an option for <b>" + get_text('covariates', 'l_high_killip') + "</b></li>";
  }


  x_lateral = $('#lateral_yes').prop('checked') | $('#lateral_no').prop('checked');
  if(!x_lateral){
    error = true;
    error_message = error_message + "<li>Choose an option for <b>" + get_text('covariates', 'l_lateral') + "</b></li>";
  }

  if(error){
    $('#result').html("<h1>Errors detected</h1><hr>Please, solve them in order to calculate the risk: <ul>" + error_message + "</ul>");
    $('#result').css("background-color", "#FF7777");
  }
  return !error;
}
function calculate_value(){
  x_distance = Number($('#distance_value').val());
  x_domicili = Number($('#pcm_domicili').prop('checked'));
  x_cap = Number($('#pcm_cap').prop('checked'));
  x_comarcal = Number($('#pcm_comarcal').prop('checked'));
  x_subite = Number($('#subite_yes').prop('checked'));
  x_cabg = Number($('#cabg_yes').prop('checked'));
  x_high_killip = Number($('#high_killip_yes').prop('checked'));
  x_lateral = Number($('#lateral_yes').prop('checked'));

  x_distance_1 = Math.min(x_distance, 40) / 10;
  x_distance_2 = (Math.max(x_distance, 40)-40) / 10;
  
  console.log('d1', x_distance_1);
  console.log('d2', x_distance_2);
  console.log('domicili', x_domicili);
  console.log('cap', x_cap);
  console.log('comarcal', x_comarcal);
  console.log('subite', x_subite);
  console.log('cabg', x_cabg);
  console.log('killip', x_high_killip);
  console.log('lateral', x_lateral);

  // value = 4.21251994 + 0.07634954 * x_distance_1 + 0.03384990 * x_distance_2 + 
  //         0.20304384 * x_comarcal + 0.07415104 * x_domicili + 0.16830551 * x_cap + 
  //         0.13990564 * x_subite + 0.09533088 * x_high_killip + 0.21596108 * x_cabg + 0.06331279 * x_lateral;
  value = 4.21251994 + 0.07634954 * x_distance_1 + 0.03384990 * x_distance_2 + 
          0.20304384 * x_comarcal + 0.5 * 0.07415104 * x_domicili + 0.16830551 * x_cap + 
          0.13990564 * x_subite + 0.09533088 * x_high_killip + 0.21596108 * x_cabg + 0.06331279 * x_lateral;
  console.log(value);
  value = Math.exp(value);

  return Math.round(value);
}

function uncheck_form(){
  $('#distance_value').val('');

  $('#pcm_sem').prop('checked', false);
  $('#pcm_domicili').prop('checked', false);
  $('#pcm_cap').prop('checked', false);  
  $('#pcm_comarcal').prop('checked', false);

  $('#subite_no').prop('checked', false);
  $('#subite_yes').prop('checked', false);  

  $('#cabg_no').prop('checked', false);
  $('#cabg_yes').prop('checked', false);

  $('#high_killip_no').prop('checked', false);
  $('#high_killip_yes').prop('checked', false);

  $('#lateral_no').prop('checked', false);
  $('#lateral_yes').prop('checked', false);

  $('#result').html('');
  $('#panel-result').hide();
  refreshUI();
}

function refreshUI(){
  var state = [];
  state['covariates'] = refresh_covariates();
}


function iniUI(){
  $('#result').hide();
  var tabs = ['covariates'];
  for(var i=0;i<tabs.length;i++){
    $("#l_" + tabs[i]).html(get_text(tabs[i], 'title'));
  }

  translate_labels();
  $('.lang_class a').click(function(){
	LANG=this.id.replace('lang_','');
        console.log(dictio.active);
        dictio.active = LANG;
        console.log(dictio.active);
	translate_labels();
	$('.lang_class').removeClass("current");
	$(this).parent().addClass("current")
	return false});

  $('#calculate_value').click(function() {
    $('#result').show();
    $('#result').css("background-color", "white");
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#result").offset().top
    }, 500);
    all_ok = check_form();
    if(!all_ok){
      console.log("error detected");
      return;
    }
    console.log("calculate risk");
    current_risk = calculate_value();
    message = '<h1>STEMI diagnosis-guire cross time</h1><hr>Current prediction: <b>' + current_risk + ' minutes</b>.<br />';
   
    $('#result').html(message);
  });

  $('#clean_button').click(function() {
    $('#result').hide();
    console.log("clicked");
    uncheck_form();
  });

  $('#cv_history_yes').change(refreshUI);
  $('#cv_history_no').change(refreshUI);
  $('#panel-result').hide();
  refreshUI();
  $("#info_instructions").click(function(){
	    //$("#info_text").slideToggle("slow");
    $('#result').show();
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#result").offset().top
    }, 500);
    $('#result').css("background-color", "#fcf0ad");
		$('#result').html(get_instructions());
	});
}

$(document).ready(iniUI);
