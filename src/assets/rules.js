export const rulesCopy = {
    cxmc: [{
            required: true,
            message: "请输入车型名称",
            trigger: "blur"
        },
        {
            max: 50,
            message: "长度不能超过 50 个字符",
            trigger: "blur"
        }
    ],
    rylx: [{
        required: true,
        message: "请选择燃料类型",
        trigger: "change"
    }],
    pl: [{
            required: true,
            message: "请输入排量",
            trigger: "blur"
        },
        {
            pattern: /^[1-6](\.[0-9]{1})?$|0.5|0.6|0.7|0.8|0.9|7.0/,
            message: "请输入0.5到7.0有效数字，保留一位小数",
            trigger: "blur",
        }
    ],
    qgs: [{
        required: true,
        message: "请选择气缸数",
        trigger: "change"
    }],
    jqfs: [{
        required: true,
        message: "请选择进气方式",
        trigger: "change"
    }],
    gyfs: [{
        required: true,
        message: "请选择供油方式",
        trigger: "change"
    }],
    xhfs: [{
        required: true,
        message: "请选择循环方式",
        trigger: "change"
    }],
    kbqmjs: [{
        required: true,
        message: "请选择可变气门技术",
        trigger: "change"
    }],
    sfdztg: [{
        required: true,
        message: "请选择是否搭载停缸",
        trigger: "change"
    }],
    sfdzqt: [{
        required: true,
        message: "请选择是否搭载启停",
        trigger: "change"
    }],
    sfdzegr: [{
        required: true,
        message: "请选择是否搭载EGR",
        trigger: "change"
    }],
    bsqxs: [{
        required: true,
        message: "请选择变速器形式",
        trigger: "change"
    }],
    dqdqjs: [{
        required: true,
        message: "请选择电子电气技术",
        trigger: "change"
    }],
    jjsjs: [{
        required: true,
        message: "请选择渐进式技术",
        trigger: "change"
    }],
    zbzl: [{
            required: true,
            message: "请输入整备质量",
            trigger: "blur"
        },
        {
            pattern: /^[1-9][0-9]{3}?$/,
            message: "请输入4位整数",
            trigger: "blur",
        }
    ],
    zwps: [{
        required: true,
        message: "请选择座位排数",
        trigger: "change"
    }],
    yh: [{
            required: true,
            message: "请输入油耗",
            trigger: "blur"
        },
        {
            pattern: /^(([1-9]{1}\d*)|([0]{1}))((\.(\d){0,2})?)$|(^\d*$)/,
            message: "请输入小数位不超过2位的有效数字",
            trigger: "blur",
        }
    ],
    zczb: [{
            required: true,
            message: "请输入总成占比",
            trigger: "blur"
        },
        {
            pattern: /^(100.0|100|[1-9]?\d(\.\d?)?)%$|0$/,
            message: "请输入百分比，保留1位小数，如13.5%",
            trigger: "blur",
        }
    ],
}
//纯电动校验规则
export const rulesCdd = {
    cxmc: [{
            required: true,
            message: "请输入车型名称",
            trigger: "blur"
        },
        {
            max: 50,
            message: "长度不能超过 50 个字符",
            trigger: "blur"
        }
    ],
    rylx: [{
        required: true,
        message: "请选择燃料名称",
        trigger: "change"
    }],
    jjsjs: [{
        required: true,
        message: "请选择渐进式技术",
        trigger: "change"
    }],
    zbzl: [{
            required: true,
            message: "请输入整备质量",
            trigger: "blur"
        },
        {
            pattern: /^[1-9][0-9]{3}?$/,
            message: "请输入整备质量",
            trigger: "blur"
        }
    ],
    zwps: [{
        required: true,
        message: "请选择座位排数",
        trigger: "change"
    }],
    yh: [{
            required: true,
            message: "请输入油耗",
            trigger: "blur"
        },
        {
            pattern: /^(([1-9]{1}\d*)|([0]{1}))((\.(\d){0,1})?)$|(^\d*$)/,
            message: "请输入小数位不超过1位的有效数字",
            trigger: "blur",
        },
    ],
    cdxh: [{
            required: true,
            message: "请输入纯电续航",
            trigger: "blur"
        },
        {
            pattern: /^([1-9][0-9]\d{0,2}|0)$/,
            message: "请输入范围0~1000整数",
            trigger: "blur",
        },
    ],
    zczb: [{
            required: true,
            message: "请输入总成占比",
            trigger: "blur"
        },
        {
            pattern: /^(100.0|100|[1-9]?\d(\.\d?)?)%$|0$/,
            message: "请输入百分比，保留1位小数，如13.5%",
            trigger: "blur",
        }
    ],
}
//混动的校验
export const rulesHd = {
    cxmc: [{
            required: true,
            message: "请输入车型名称",
            trigger: "blur"
        },
        {
            max: 50,
            message: "长度不能超过 50 个字符",
            trigger: "blur"
        }
    ],
    rylx: [{
        required: true,
        message: "请选择燃料类型",
        trigger: "change"
    }],
    pl: [{
            required: true,
            message: "请输入排量",
            trigger: "blur"
        },
        {
            pattern: /^[1-6](\.[0-9]{1})?$|0.5|0.6|0.7|0.8|0.9|7.0/,
            message: "请输入0.5到7.0有效数字，保留一位小数",
            trigger: "blur",
        }
    ],
    qgs: [{
        required: true,
        message: "请选择气缸数",
        trigger: "change"
    }],
    jqfs: [{
        required: true,
        message: "请选择进气方式",
        trigger: "change"
    }],
    gyfs: [{
        required: true,
        message: "请选择供油方式",
        trigger: "change"
    }],
    xhfs: [{
        required: true,
        message: "请选择循环方式",
        trigger: "change"
    }],
    kbqmjs: [{
        required: true,
        message: "请选择可变气门技术",
        trigger: "change"
    }],
    sfdztg: [{
        required: true,
        message: "请选择是否搭载停缸",
        trigger: "change"
    }],
    sfdzqt: [{
        required: true,
        message: "请选择是否搭载启停",
        trigger: "change"
    }],
    sfdzegr: [{
        required: true,
        message: "请选择是否搭载EGR",
        trigger: "change"
    }],
    bsqxs: [{
        required: true,
        message: "请选择变速器形式",
        trigger: "change"
    }],
    dqdqjs: [{
        required: true,
        message: "请选择电子电气技术",
        trigger: "change"
    }],
    jjsjs: [{
        required: true,
        message: "请选择渐进式技术",
        trigger: "change"
    }],
    zbzl: [{
            required: true,
            message: "请输入整备质量",
            trigger: "blur"
        },
        {
            pattern: /^[1-9][0-9]{3}?$/,
            message: "请输入4位整数",
            trigger: "blur",
        }
    ],
    zwps: [{
        required: true,
        message: "请选择座位排数",
        trigger: "change"
    }],
    cdxh: [{
            required: true,
            message: "请输入纯电续航",
            trigger: "blur"
        },
        {
            pattern: /^([1-9][0-9]\d{0,2}|0)$/,
            message: "请输入范围0~1000整数",
            trigger: "blur",
        },
    ],
    yh: [{
            required: true,
            message: "请输入油耗",
            trigger: "blur"
        },
        {
            pattern: /^(([1-9]{1}\d*)|([0]{1}))((\.(\d){0,2})?)$|(^\d*$)/,
            message: "请输入小数位不超过2位的有效数字",
            trigger: "blur",
        }
    ],
    zczb: [{
            required: true,
            message: "请输入总成占比",
            trigger: "blur"
        },
        {
            pattern: /^(100.0|100|[1-9]?\d(\.\d?)?)%$|0$/,
            message: "请输入百分比，保留1位小数，如13.5%",
            trigger: "blur",
        }
    ],
}