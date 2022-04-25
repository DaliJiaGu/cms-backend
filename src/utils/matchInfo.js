const matchCommon = (Info) => {
  const res = {};
  res.offset = Info.offset;
  res.size = Info.size;
  res.name = Info.name ? ('%' + Info.name + '%') : '%';
  res.startTime = Info.createAt ? Info.createAt[0] : '%';
  res.endTime = Info.createAt ? Info.createAt[1] : '%';
  return res;
}


const matchUserInfo = (userInfo) => {
  const res = matchCommon(userInfo)
  res.realname = userInfo.realname ? ('%' + userInfo.realname + '%') : '%';
  res.enable = userInfo.enable ? ('%' + userInfo.enable + '%') : '%';
  res.cellphone =userInfo.cellphone ? ('%' + userInfo.cellphone + '%') : '%';
  return res;
}

const matchDepartment = (Info) => {
  const res = matchCommon(Info);
  res.leader = Info.leader ? ('%' + Info.leader + '%') : '%';
  return res;
}

const matchRoleInfo = (Info) => {
  const res = matchCommon(Info)
  res.intro = Info.intro ? ('%' + Info.intro + '%') : '%';
  return res;
}

const matchGoodsInfo = (Info) => {
  const res = matchCommon(Info);
  res.status = Info.status ? ('%' + Info.status + '%') : '%';
  return res;
}

const matchCategoryInfo = (Info) => {
  return matchCommon(Info)
}

module.exports = {
  matchUserInfo,
  matchDepartment,
  matchRoleInfo,
  matchGoodsInfo,
  matchCategoryInfo
}