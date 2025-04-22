const ctx = document.getElementById('ecoChart').getContext('2d')

Chart.defaults.locale = 'ru-RU'

new Chart(ctx, {
  type: 'line',
  data: {
    labels: [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек',
    ],
    datasets: [
      {
        label: 'Плавное восстановление (монотонное)',
        data: [
          0, 5000, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000,
          90000, 100000,
        ],
        borderColor: '#F38BA0',
        tension: 0.4,
        cubicInterpolationMode: 'monotone',
        fill: false,
      },
      {
        label: 'Ускоренная высадка',
        data: [
          0, 3000, 7000, 15000, 25000, 35000, 50000, 70000, 85000, 95000, 98000,
          100000,
        ],
        borderColor: '#80C0FF',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Линейная стратегия',
        data: [
          0, 8000, 16000, 24000, 32000, 40000, 48000, 56000, 64000, 72000,
          80000, 88000,
        ],
        borderColor: '#8ED1B7',
        tension: 0,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    locale: 'ru-RU',
    plugins: {
      legend: {
        labels: {
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          // Можно добавить title, если там по-прежнему английский
          title: function (tooltipItems) {
            return `Месяц: ${tooltipItems[0].label}`
          },
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString(
              'ru-RU'
            )} деревьев`
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Месяц',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Количество деревьев',
        },
        ticks: {
          callback: function (value) {
            return value.toLocaleString('ru-RU')
          },
        },
        beginAtZero: true,
      },
    },
  },
})
