const SEND_ANSWER_PHASE = 1;

const currentSectorNumber = parseInt($('#currents-sector-number').text());

$('.small-img-wrapper').click((event) => {
    const $target = $(event.currentTarget);
    const imgId = $target.find('img').attr('id').substr(0, 2);
    const $popup = $target.parent().find('.popup-wrapper');
    const $popupContent = $popup.find('.popup-content');
    if ($popupContent.children('img').length === 0) {
        $('#' + imgId + '-large-img').insertBefore($popupContent.children('.answer-inputs'));
        // $popupContent.children('.answer-inputs').insertAf.append($('#' + imgId + '-large-img'))
    }
    $popup.show();
});

$('.answer-input').click((event) => {
    if (answerSendingEnabled) {
        toggleSelected(event);
    }
});

/************************************
 *       OVERRIDDEN FUNCTIONS       *
 ************************************/

function getAnswerStr() {
    let answerStr = '';
    $('.risk-img-cell').each((i, el) => {
        const $indicator = $(el).find('.risk-indicator');
        if ($indicator.hasClass('no-level')) answerStr += i + '-0,';
        if ($indicator.hasClass('low-level')) answerStr += i + '-1,';
        if ($indicator.hasClass('mid-level')) answerStr += i + '-2,';
        if ($indicator.hasClass('high-level')) answerStr += i + '-3,';

        // delete last comma
        if (i === 11 && answerStr.length > 0) answerStr = answerStr.substr(0, answerStr.length - 1);
    });
    return answerStr;
}

function toggleSelected(event) {
    const $target = $(event.currentTarget);
    // clear self-made radio-buttons
    $target.siblings().removeClass('selected');

    // toggle selection of clicked input
    $target.toggleClass('selected');

    // remove indicator from img-cell if any
    const $indicator = $target.parents('.risk-img-cell').find('.risk-indicator');
    $indicator.removeClass('low-level mid-level high-level');

    if ($target.hasClass('selected')) {
        // add new indicator to img-cell
        const className = $target.hasClass('low-level') ? 'low-level'
            : $target.hasClass('no-level') ? 'no-level'
                : $target.hasClass('mid-level') ? 'mid-level' : 'high-level';
        $indicator.addClass(className);
    }
}

/************************************
 *       OVERRIDDEN FUNCTIONS       *
 ************************************/


/************************************
 *        CONTROLLER SETTINGS       *
 ************************************/

controller.setOnRoundChange(() => {
    $('.risk-indicator').removeClass('no-level low-level mid-level high-level')
        .addClass('no-answer');
    controller.sendResponses();
});
controller.connect();
controller.changePhase(currentPhaseNumber, '', '');

/************************************
 *            ON PAGE LOAD          *
 ************************************/

/*
if (currentSectorNumber === 0) {
    $('.preparation-phases').show();
} else {
    $('.sector-phases').hide();
    $('#sector-phases-' + currentSectorNumber).show();
}
controller.changePhase(currentPhaseNumber);*/
