let id = ["5be69c24b2e54c2703722dd5", "5d1b358f40d2c3b0a77e79dc", "59dc7bcdeb810140131e9487", "5aed38b059f27da26ccadf42", "5e244abeb9c4730019470757", "5a9660969a27f706fd2d5321", "5e5326c63c9bbc002b75210b"];

const getProfileImage = (id) => {
    return `https://playentry.org/uploads/profile/${id.substring(0, 2)}/${id.substring(2, 4)}/avatar_${id}.png`
}

const getName = (name, num) => {
    if (name.length > num) {
        return name.substr(0, num) + '...';
    } else {
        return name;
    };
};

const getDesc = (desc, num) => {
    if (desc.length > num) {
        return desc.substr(0, num).replace('\n', ' ') + '...';
    } else {
        return desc.replace('\n', ' ');
    };
};

if (!localStorage.getItem('reclist')) {
    localStorage.setItem('reclist', 'image');
}



const recInit = (name, desc, id, username, thumb, like, visit, updated, pid) => {

    if (localStorage.getItem('reclist').toString() == 'image') {
        $('#rec').append(`
    <div class="ui card">
        <div class="content">
            <div class="right floated meta">${updated.substr(0, 4)}년 ${updated.substr(5, 2)}월 ${updated.substr(8, 2)}일 </div>
            <img class="ui avatar image" src="${getProfileImage(id)}"> ${username}
        </div>
        <div class="image">
            <img src="https://playentry.org/${thumb}">
        </div>
        <div class="content">
            <a class="header" href="/player/?id=${pid}" target="_blank">${getName(name, 17)}</a>
            <div class="description">
                ${getDesc(desc, 45)}
            </div>
            <div class="ui divider"></div>
            <span class="right floated">
                <i class="heart like icon"></i>
                ${like}
            </span>
            <i class="eye icon"></i>
            ${visit}
        </div>
    </div>
    `);
    } else {
        $('#recList').append(`
    <tr>
        <td data-label="작품명"><a href="/player/?id=${pid}" target="_blank">${getName(name, 50)}</a></td>
        <td data-label="제작자">${username}</td>
        <td data-label="최종 수정일">${updated.substr(0, 4)}년 ${updated.substr(5, 2)}월 ${updated.substr(8, 2)}일</td>
    </tr>
    `);
    }
}

const recList = (type) => {
    localStorage.setItem('reclist', type);
    location.reload();
}

$('#rec').html('');

if (localStorage.getItem('reclist').toString() == 'list') {
    $('#rec').append(`
    <table class="ui celled table">
        <thead>
            <tr>
                <th>작품명</th>
                <th style="width: 15em;">제작자</th>
                <th style="width: 15em;">최종 수정일</th>
            </tr>
        </thead>
        <tbody id="recList"></tbody>
    </table>
    `)
}

for (let i = 0; i < id.length; i++) {
    $.ajax({
        url: `https://playentry.org/api/project/${id[i]}`,
        crossDomain: true,
        dataType: "jsonp",
        type: 'GET',
        data: "",
        success: function(res) {
            recInit(res.name, res.description, res.user._id, res.user.username, res.thumb, res.likeCnt, res.visit, res.updated, id[i]);
        }
    })
}