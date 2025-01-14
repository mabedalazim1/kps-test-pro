const AsesArabic = require('./../models/assessment.model').AsesArabic
const AsesMath = require('./../models/assessment.model').AsesMath
const AsesDain = require('./../models/assessment.model').AsesDain
const AsesEnglish = require('./../models/assessment.model').AsesEnglish
const AsesScince = require('./../models/assessment.model').AsesScince
const AsesSocial = require('./../models/assessment.model').AsesSocial
const AsesTocnolegy = require('./../models/assessment.model').AsesTocnolegy
const AsesMaharat = require('./../models/assessment.model').AsesMaharat
const AsesGiab = require('./../models/assessment.model').Giab

const Student = require('./../models/school.model').Student
const User = require('./../models/school.model').User
const readXlsxFile = require("read-excel-file/node");
const fs = require("fs");
const { promisify } = require('util');
const { where, GEOMETRY } = require('sequelize');
const unlinkAsync = promisify(fs.unlink)



const upload_asesArabic = (req, res) => {

    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!")
        }
        let fullPath = __basedir + "/resources/static/assets/excelFiles/"
        let path =
            fullPath + req.file.filename;

        readXlsxFile(path).then(async (rows) => {
            // skip header
            rows.shift();
            rows.shift();
            rows.shift();
            rows.shift();
            let degrees = [];

            rows.forEach((row) => {

                let degree = {
                    student_Id: row[3],
                    arabic_maham: row[4],
                    arabic_wageb: row[5],
                    arabic_nasht: row[6],
                    arabic_weekly: row[7],
                    arabic_monthly: row[8],
                    arabic_mowazba: row[9],
                    arabic_test: row[10],
                    year_id: row[11],
                    term_id: row[12],
                    grade_id: row[13]
                };

                degrees.push(degree)
            });

            await AsesArabic.findAll({
                where:
                {
                    year_id: degrees[0].year_id,
                    term_id: degrees[0].term_id,
                    grade_id: degrees[0].grade_id,

                }
            }).then(async (res) => {
                if (res.length > 0) {
                    await AsesArabic.destroy({
                        where:
                        {
                            year_id: degrees[0].year_id,
                            term_id: degrees[0].term_id,
                            grade_id: degrees[0].grade_id,
                        }
                    })
                }
            })
            AsesArabic.bulkCreate(degrees)
                .then(() => {
                    res.status(200).send({
                        message: "Uploaded the file successfully: " + req.file.filename,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Fail to import data into database!",
                        error: error.message,
                    });
                    console.log(error);
                })
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.filename,
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })
    }
};

const upload_asesDain = (req, res) => {

    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!")
        }
        let fullPath = __basedir + "/resources/static/assets/excelFiles/"
        let path =
            fullPath + req.file.filename;

        readXlsxFile(path).then(async (rows) => {
            // skip header
            rows.shift();
            rows.shift();
            rows.shift();
            rows.shift();
            let degrees = [];

            rows.forEach((row) => {

                let degree = {
                    student_Id: row[3],
                    dain_maham: row[4],
                    dain_wageb: row[5],
                    dain_nasht: row[6],
                    dain_weekly: row[7],
                    dain_monthly: row[8],
                    dain_mowazba: row[9],
                    dain_test: row[10],
                    year_id: row[11],
                    term_id: row[12],
                    grade_id: row[13]
                };

                degrees.push(degree)
            });

            await AsesDain.findAll({
                where:
                {
                    year_id: degrees[0].year_id,
                    term_id: degrees[0].term_id,
                    grade_id: degrees[0].grade_id,

                }
            }).then(async (res) => {
                if (res.length > 0) {
                    await AsesDain.destroy({
                        where:
                        {
                            year_id: degrees[0].year_id,
                            term_id: degrees[0].term_id,
                            grade_id: degrees[0].grade_id,
                        }
                    })
                }
            })
            AsesDain.bulkCreate(degrees)
                .then(() => {
                    res.status(200).send({
                        message: "Uploaded the file successfully: " + req.file.filename,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Fail to import data into database!",
                        error: error.message,
                    });
                    console.log(error);
                })
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.filename,
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })
    }
};

const upload_asesMath = (req, res) => {

    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!")
        }
        let fullPath = __basedir + "/resources/static/assets/excelFiles/"
        let path =
            fullPath + req.file.filename;

        readXlsxFile(path).then(async (rows) => {
            // skip header
            rows.shift();
            rows.shift();
            rows.shift();
            rows.shift();
            let degrees = [];

            rows.forEach((row) => {

                let degree = {
                    student_Id: row[3],
                    math_maham: row[4],
                    math_wageb: row[5],
                    math_nasht: row[6],
                    math_weekly: row[7],
                    math_monthly: row[8],
                    math_mowazba: row[9],
                    math_test: row[10],
                    year_id: row[11],
                    term_id: row[12],
                    grade_id: row[13]
                };

                degrees.push(degree)
            });

            await AsesMath.findAll({
                where:
                {
                    year_id: degrees[0].year_id,
                    term_id: degrees[0].term_id,
                    grade_id: degrees[0].grade_id,

                }
            }).then(async (res) => {
                if (res.length > 0) {
                    await AsesMath.destroy({
                        where:
                        {
                            year_id: degrees[0].year_id,
                            term_id: degrees[0].term_id,
                            grade_id: degrees[0].grade_id,
                        }
                    })
                }
            })
            AsesMath.bulkCreate(degrees)
                .then(() => {
                    res.status(200).send({
                        message: "Uploaded the file successfully: " + req.file.filename,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Fail to import data into database!",
                        error: error.message,
                    });
                    console.log(error);
                })
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.filename,
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })
    }
};

const upload_asesScince = (req, res) => {

    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!")
        }
        let fullPath = __basedir + "/resources/static/assets/excelFiles/"
        let path =
            fullPath + req.file.filename;

        readXlsxFile(path).then(async (rows) => {
            // skip header
            rows.shift();
            rows.shift();
            rows.shift();
            rows.shift();
            let degrees = [];

            rows.forEach((row) => {

                let degree = {
                    student_Id: row[3],
                    scince_maham: row[4],
                    scince_wageb: row[5],
                    scince_nasht: row[6],
                    scince_weekly: row[7],
                    scince_monthly: row[8],
                    scince_mowazba: row[9],
                    scince_test: row[10],
                    year_id: row[11],
                    term_id: row[12],
                    grade_id: row[13]
                };

                degrees.push(degree)
            });

            await AsesScince.findAll({
                where:
                {
                    year_id: degrees[0].year_id,
                    term_id: degrees[0].term_id,
                    grade_id: degrees[0].grade_id,

                }
            }).then(async (res) => {
                if (res.length > 0) {
                    await AsesScince.destroy({
                        where:
                        {
                            year_id: degrees[0].year_id,
                            term_id: degrees[0].term_id,
                            grade_id: degrees[0].grade_id,
                        }
                    })
                }
            })
            AsesScince.bulkCreate(degrees)
                .then(() => {
                    res.status(200).send({
                        message: "Uploaded the file successfully: " + req.file.filename,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Fail to import data into database!",
                        error: error.message,
                    });
                    console.log(error);
                })
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.filename,
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })
    }
};

const upload_asesSocial = (req, res) => {

    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!")
        }
        let fullPath = __basedir + "/resources/static/assets/excelFiles/"
        let path =
            fullPath + req.file.filename;

        readXlsxFile(path).then(async (rows) => {
            // skip header
            rows.shift();
            rows.shift();
            rows.shift();
            rows.shift();
            let degrees = [];

            rows.forEach((row) => {

                let degree = {
                    student_Id: row[3],
                    social_maham: row[4],
                    social_wageb: row[5],
                    social_nasht: row[6],
                    social_weekly: row[7],
                    social_monthly: row[8],
                    social_mowazba: row[9],
                    social_test: row[10],
                    year_id: row[11],
                    term_id: row[12],
                    grade_id: row[13]
                };

                degrees.push(degree)
            });

            await AsesSocial.findAll({
                where:
                {
                    year_id: degrees[0].year_id,
                    term_id: degrees[0].term_id,
                    grade_id: degrees[0].grade_id,

                }
            }).then(async (res) => {
                if (res.length > 0) {
                    await AsesSocial.destroy({
                        where:
                        {
                            year_id: degrees[0].year_id,
                            term_id: degrees[0].term_id,
                            grade_id: degrees[0].grade_id,
                        }
                    })
                }
            })
            AsesSocial.bulkCreate(degrees)
                .then(() => {
                    res.status(200).send({
                        message: "Uploaded the file successfully: " + req.file.filename,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Fail to import data into database!",
                        error: error.message,
                    });
                    console.log(error);
                })
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.filename,
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })
    }
};

const upload_asesEnglish = (req, res) => {

    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!")
        }
        let fullPath = __basedir + "/resources/static/assets/excelFiles/"
        let path =
            fullPath + req.file.filename;

        readXlsxFile(path).then(async (rows) => {
            // skip header
            rows.shift();
            rows.shift();
            rows.shift();
            rows.shift();
            let degrees = [];

            rows.forEach((row) => {

                let degree = {
                    student_Id: row[3],
                    english_maham: row[4],
                    english_wageb: row[5],
                    english_nasht: row[6],
                    english_weekly: row[7],
                    english_monthly: row[8],
                    english_mowazba: row[9],
                    english_test: row[10],
                    year_id: row[11],
                    term_id: row[12],
                    grade_id: row[13]
                };

                degrees.push(degree)
            });

            await AsesEnglish.findAll({
                where:
                {
                    year_id: degrees[0].year_id,
                    term_id: degrees[0].term_id,
                    grade_id: degrees[0].grade_id,

                }
            }).then(async (res) => {
                if (res.length > 0) {
                    await AsesEnglish.destroy({
                        where:
                        {
                            year_id: degrees[0].year_id,
                            term_id: degrees[0].term_id,
                            grade_id: degrees[0].grade_id,
                        }
                    })
                }
            })
            AsesEnglish.bulkCreate(degrees)
                .then(() => {
                    res.status(200).send({
                        message: "Uploaded the file successfully: " + req.file.filename,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Fail to import data into database!",
                        error: error.message,
                    });
                    console.log(error);
                })
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.filename,
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })
    }
};

const upload_asesMaharat = (req, res) => {

    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!")
        }
        let fullPath = __basedir + "/resources/static/assets/excelFiles/"
        let path =
            fullPath + req.file.filename;

        readXlsxFile(path).then(async (rows) => {
            // skip header
            rows.shift();
            rows.shift();
            rows.shift();
            rows.shift();
            let degrees = [];

            rows.forEach((row) => {

                let degree = {
                    student_Id: row[3],
                    maharat_maham: row[4],
                    maharat_wageb: row[5],
                    maharat_nasht: row[6],
                    maharat_weekly: row[7],
                    maharat_monthly: row[8],
                    maharat_mowazba: row[9],
                    maharat_test: row[10],
                    year_id: row[11],
                    term_id: row[12],
                    grade_id: row[13]
                };

                degrees.push(degree)
            });

            await AsesMaharat.findAll({
                where:
                {
                    year_id: degrees[0].year_id,
                    term_id: degrees[0].term_id,
                    grade_id: degrees[0].grade_id,

                }
            }).then(async (res) => {
                if (res.length > 0) {
                    await AsesMaharat.destroy({
                        where:
                        {
                            year_id: degrees[0].year_id,
                            term_id: degrees[0].term_id,
                            grade_id: degrees[0].grade_id,
                        }
                    })
                }
            })
            AsesMaharat.bulkCreate(degrees)
                .then(() => {
                    res.status(200).send({
                        message: "Uploaded the file successfully: " + req.file.filename,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Fail to import data into database!",
                        error: error.message,
                    });
                    console.log(error);
                })
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.filename,
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })
    }
};


const upload_asesMTocnolegy = (req, res) => {

    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!")
        }
        let fullPath = __basedir + "/resources/static/assets/excelFiles/"
        let path =
            fullPath + req.file.filename;

        readXlsxFile(path).then(async (rows) => {
            // skip header
            rows.shift();
            rows.shift();
            rows.shift();
            rows.shift();
            let degrees = [];

            rows.forEach((row) => {

                let degree = {
                    student_Id: row[3],
                    tocnolegy_maham: row[4],
                    tocnolegy_wageb: row[5],
                    tocnolegy_nasht: row[6],
                    tocnolegy_weekly: row[7],
                    tocnolegy_monthly: row[8],
                    tocnolegy_mowazba: row[9],
                    tocnolegy_test: row[10],
                    year_id: row[11],
                    term_id: row[12],
                    grade_id: row[13]
                };

                degrees.push(degree)
            });

            await AsesTocnolegy.findAll({
                where:
                {
                    year_id: degrees[0].year_id,
                    term_id: degrees[0].term_id,
                    grade_id: degrees[0].grade_id,

                }
            }).then(async (res) => {
                if (res.length > 0) {
                    await AsesTocnolegy.destroy({
                        where:
                        {
                            year_id: degrees[0].year_id,
                            term_id: degrees[0].term_id,
                            grade_id: degrees[0].grade_id,
                        }
                    })
                }
            })
            AsesTocnolegy.bulkCreate(degrees)
                .then(() => {
                    res.status(200).send({
                        message: "Uploaded the file successfully: " + req.file.filename,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Fail to import data into database!",
                        error: error.message,
                    });
                    console.log(error);
                })
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.filename,
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })
    }
};

const upload_giab = (req, res) => {

    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!")
        }
        let fullPath = __basedir + "/resources/static/assets/excelFiles/"
        let path =
            fullPath + req.file.filename;

        readXlsxFile(path).then(async (rows) => {
            // skip header
            rows.shift();
            rows.shift();
            rows.shift();
            rows.shift();
            let degrees = [];

            rows.forEach((row) => {

                let degree = {
                    student_Id: row[3],
                    giab_no: row[4],
                    giab_rate: row[7],
                    year_id: row[6],
                    term_id: row[9],
                    grade_id: row[5]
                };

                degrees.push(degree)
            });

            await AsesGiab.findAll({
                where:
                {
                    year_id: degrees[0].year_id,
                    term_id: degrees[0].term_id,
                    grade_id: degrees[0].grade_id,

                }
            }).then(async (res) => {
                if (res.length > 0) {
                    await AsesGiab.destroy({
                        where:
                        {
                            year_id: degrees[0].year_id,
                            term_id: degrees[0].term_id,
                            grade_id: degrees[0].grade_id,
                        }
                    })
                }
            })
            AsesGiab.bulkCreate(degrees)
                .then(() => {
                    res.status(200).send({
                        message: "Uploaded the file successfully: " + req.file.filename,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Fail to import data into database!",
                        error: error.message,
                    });
                    console.log(error);
                })
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.filename,
        }).then(async () => {
            // Delete the file like normal
            await unlinkAsync(path)
        })
    }
};


module.exports = {
    upload_asesArabic,
    upload_asesMath,
    upload_asesDain,
    upload_asesScince,
    upload_asesSocial,
    upload_asesEnglish,
    upload_asesMaharat,
    upload_asesMTocnolegy,
    upload_giab,
};