(function(w) {
    function Loading(options) {
        options = options || { cycleCount: 3, loadingText: 'LOADING...' };
        this.cycleCount = options.cycleCount;
        this.loadingText = options.loadingText;
        this.render();
        this.init();
    }
    Loading.prototype.init = function() {
        this.reset();
        this.loop();
    };
    Loading.prototype.render = function() {
        this.words = this.lettering();
        this.letters = this.elem.querySelectorAll('span');
        this.letterCount = this.letters.length;
    };
    // 重置状态
    Loading.prototype.reset = function() {
        var words = this.words;
        var letters = this.letters;
        this.done = false;
        this.cycleCurrent = 0;
        this.letterCurrent = 0;
        for (var i = 0, l = letters.length; i < l; i++) {
            var letter = letters[i];
            letter.innerText = words[i];
            letter.className = '';
        }
    };
    // 获取随机的单字节字符
    Loading.prototype.getChar = function() {
        var random = this.random(0, Math.pow(2, 8)).toString(16);
        var char = eval(
            '"\\u00' + ('0' + random).substring(random.length - 1) + '"'
        );
        // 过滤空白字符
        var pattern = /[\u0000-\u0020\u007F-\u00A0\u1680\u180E\u2000-\u200B\u2028\u2029\u202F\u205F\u3000\uFEFF]/;
        if (pattern.test(char)) {
            return this.getChar();
        } else {
            return char;
        }
    };
    // 分词
    Loading.prototype.lettering = function() {
        // 生成wrapper
        var elem = (this.elem = document.createElement('div'));
        elem.className = 'ld-words';
        // 分词
        var html = '';
        var words = this.loadingText.split('');
        for (var i = 0, len = words.length; i < len; i++) {
            html += '<span>' + words[i] + '</span>';
        }
        elem.innerHTML = html;
        document.body.appendChild(elem);
        return words;
    };
    // 生成[n,m)范围内的随机数
    Loading.prototype.random = function(n, m) {
        var c = m - n;
        return Math.floor(Math.random() * c + n);
    };
    Loading.prototype.loop = function() {
        var self = this;
        var letters = this.letters;
        for (var i = 0, l = letters.length; i < l; i++) {
            var elem = letters[i];
            if (i >= self.letterCurrent) {
                if (elem.innerText !== ' ') {
                    elem.innerText = self.getChar();
                    elem.style = 'opacity: ' + Math.random();
                }
            }
        }

        if (this.cycleCurrent < this.cycleCount) {
            this.cycleCurrent++;
        } else if (this.letterCurrent < this.letterCount) {
            var currLetter = letters[this.letterCurrent];
            this.cycleCurrent = 0;
            currLetter.innerText = this.words[this.letterCurrent];
            currLetter.style = 'opacity:1';
            currLetter.className = 'done';
            this.letterCurrent++;
        } else {
            this.done = true;
        }

        if (!this.done) {
            this.animateId = requestAnimationFrame(function() {
                self.loop();
            });
        } else {
            if (!this.stopLoading) {
                setTimeout(function() {
                    self.init();
                }, 300);
            } else {
                this.resolve && this.resolve();
                this.elem.style.display = 'none';
            }
        }
    };
    Loading.prototype.destroy = function() {
        var self = this;
        this.stopLoading = true;
        if (typeof Promise === 'function') {
            return new Promise(function(resolve, reject) {
                self.resolve = resolve;
            });
        }
    };

    var _loading = (w[Symbol.for('_loading')] = new Loading());
    setTimeout(() => {
        _loading.destroy().then(() => {
            document.querySelector('.hi').style.display = 'block';
        });
    }, 5000);
})(window);
