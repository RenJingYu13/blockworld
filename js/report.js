document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reportForm");
    const btn = document.getElementById("submitBtn");

    // 你的 Worker 接口
    const WORKER_URL = "https://w.blockworld.eu.cc";

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // 1. 改变按钮状态
        btn.textContent = "正在提交证据...";
        btn.disabled = true;

        // 2. 收集数据
        const formData = new FormData(form);
        const payload = {
            yourId: formData.get("user_id"),
            targetId: formData.get("target_id"),
            type: formData.get("violation_type"),
            happenTime: formData.get("happen_time"),
            detail: formData.get("detail")
        };

        try {
            // 3. 发送给 Worker
            const response = await fetch(WORKER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.code === 0) {
                alert("✅ 举报成功！举报信息已存入 S3 归档，管理员会尽快核实。");
                form.reset();
            } else {
                alert("❌ 提交失败: " + result.msg);
            }
        } catch (err) {
            alert("🌐 连不上举报服务器，请联系群内管理员。");
            console.error(err);
        } finally {
            btn.textContent = "提交举报";
            btn.disabled = false;
        }
    });
});
