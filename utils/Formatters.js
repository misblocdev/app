export const numberWithCommas = x => {
    let trim = x ? x.toString().split(".") : 0;
    if (trim[0]) {
        let new_num = trim[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return new_num.concat("", trim[1] ? `.${trim[1]}` : "");
    } else return 0;
}