var $ = function(id) {
    return document.getElementById(id);
};
function clrscrn() {
    $("form1").reset();
    $("results").innerHTML = "";
    $("StudentNo").focus();
}
window.onload = function() {
    $("btnClr").onclick = clrscrn;
    $("btnCalc").onclick = calculate;
    $("StudentNo").focus();
};
window.onerror = function(a,b,c,d) {
    alert(a + '\n' + b + '\n' + c + '\n' + d);
    return false;
};
function calculate() {
    var sno = $("StudentNo").value.trim();
    if (sno === "") {
        alert("student Number is missing");
        $("StudentNo").focus();
        return;
    } else if (sno.substring(0,1).toUpperCase() !== "A") {
        alert("Student number must start with 'A'");
        $("StudentNO").focus();
        return;
    } else if (sno.length !== 9) {
        alert("Student number is not proper length.");
        $("StudentNo").focus();
        return;
      
    } else {
        var zerocount = 0;
        for (i=1; i<sno.length; i++) {
            if (isNaN(parseFloat(sno.substring(i,i+1)))) {
                alert("Student number after 'A' contains non-digits");
                $("StudentNo").focus();
                return;
            } else if (sno.charAt(i) === '0') {
                zerocount++;
            }
            //end of for
        if (zerocount === 8) {
            alert("Student number after 'A' cannot be all zero");
            $("StudentNo").focus();
            return;
           } 
        }
    }
    var lnm = $("LastName").value.trim();
    if (lnm === "") {
        alert("Last Name is missing");
        $("LastName").focus();
        return;
    }
    var fnm = $("FirstName").value.trim();
    if (fnm === "") {
        alert("First Name is missing");
        $("FirstName").focus();
        return;
    }
    var q1 = validateScore("Q1");
    if (q1 === -1) {
        return;
    }
    var q2 = validateScore("Q2");
    if (q2 === -1) {
        return;
    }
    var q3 = validateScore("Q3");
    if (q3 === -1) {
        return;
    }
    var q4 = validateScore("Q4");
    if (q4 === -1) {
        return;
    }
    var q5 = validateScore("Q5");
    if (q5 === -1) {
        return;
    }
    if ($("QM").value.trim() === "") {
        $("QM").value = "0";
    }
    var qm = validateScore("QM");
    if (qm === -1) {
        return;
    }
    //calculate quiz average
    var qavg = quizAverage(q1,q2,q3,q4,q5,qm);
    
    var mt = validateScore("MidTerm");
    if (mt === -1) {
        return;
    }
    var pr = validateScore("Problems");
    if (pr === -1) {
        return;
    }
    if (qavg >= 89.5 && mt >= 89.5 && pr >= 89.5) {
        // no final taken
        cavg = (qavg + mt + pr) / 3.0;
        lgrade = "A";
    } else {
        var fe = validateScore("Final");
        if (fe === -1) {
            return;
        }
        cavg = (qavg * .5) +(mt * .15) + (pr * .1) + (fe * .25);
        if (cavg >= 89.5) {
            lgrade = "A";
        } else if (cavg >= 79.5) {
            lgrade = "B";
        } else if (cavg >= 69.5) {
            lgrade = "C";
        } else if (cavg >= 59.5) {
            lgrade = "D";
        } else  {
            lgrade = "F";
        }
    }
        
    $("results").innerHTML = "Quiz Average = " + qavg.toFixed(1) + 
                             " and course average = " + cavg.toFixed(2) + 
                             " for a grade of: " + lgrade;
        }
function validateScore(id) {
    var s = parseFloat( $(id).value );
    if (isNaN(s) || s < 0 || s > 100) {
        alert(id + "must be a number from 0 to 100");
        $(id).focus();
        s = -1;
    }
    return s;
}
function quizAverage(q1,q2,q3,q4,q5,qm) {
    var qa = [q1,q2,q3,q4,q5,qm];
    qa.sort(function(a,b) {
                return a-b;
        } 
        );
    return (qa[2]+qa[3]+qa[4]+qa[5])/4.0;
}
