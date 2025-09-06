import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface ReportData {
  checkDate: string;
  checkNumber: string;
  customerInfo: string;
  fullName: string;
  phoneNumbers: string;
  emails: string;
  documents: string;
  addresses: string;
  vehicles: string;
  socialAccounts: string;
  phoneContacts: string;
  vkProfile: string;
  vkProfileUrl: string;
  additionalAccounts: string;
  telegramProfile: string;
  telegramUsername: string;
  purchaseReport: string;
  conclusion: string;
  confidentiality: string;
}

const Index = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    customerInfo: true,
    generalInfo: true,
    vkAnalysis: true,
    additionalAccounts: true,
    telegramAnalysis: true,
    purchaseReport: true,
    conclusion: true,
    confidentiality: true
  });

  const reportRef = useRef<HTMLDivElement>(null);

  const [reportData, setReportData] = useState<ReportData>({
    checkDate: new Date().toLocaleDateString('ru-RU'),
    checkNumber: 'В/П 01442-25',
    customerInfo: '+7 XXX XXX XX XX | VK: id12345678 | Telegram: @username',
    fullName: '',
    phoneNumbers: '',
    emails: '',
    documents: '',
    addresses: '',
    vehicles: '',
    socialAccounts: '',
    phoneContacts: '',
    vkProfile: '',
    vkProfileUrl: 'vk.com/id12345678',
    additionalAccounts: 'В рамках комплексной проверки на верность вашей второй половины, которая проводилась по всем открытым и доступным источникам, мы провели детальный анализ с использованием специализированного программного обеспечения и технических средств. Целью было выявление возможной связи вашей второй половины с похожими аккаунтами и профилями в социальных сетях и на сайтах знакомств, включая поиск дополнительных, скрытых, удалённых профилей и аккаунтов на всех доступных платформах. По результатам углублённого поиска и анализу полученных данных, мы можем с уверенностью в 99,9% заявить, что ваша вторая половина не имеет отношения к обнаруженным схожим аккаунтам ВКонтакте и профилям на сервисах и сайтах знакомств.',
    telegramProfile: '',
    telegramUsername: '@username',
    purchaseReport: 'В рамках проведённого исследования был осуществлён углублённый поиск по всем доступным открытым источникам, платформам и информационным ресурсам, с целью выявления возможной информации о последних покупках вашей второй половины. Основной задачей являлось определение признаков, которые могли бы свидетельствовать о подозрительном или необычном поведении. В процессе поиска и анализа информации были обнаружены некоторые схожие цифровые данные, связанные с покупками в отдельных магазинах, что предполагали наличие цифровых признаков, схожих с цифровыми данными вашей второй половины. Однако, при дополнительном и более детальном изучении, подтверждение таких данных установлено не было. В результате, можно констатировать факт, что в открытых информационных ресурсах отсутствует информация о каких-либо покупках в розничных магазинах или интернет-магазинах, связанных с вашей второй половиной.',
    conclusion: 'По результатам комплексного и тщательного анализа, проведённого в рамках услуги «Полная проверка на верность», мы представляем вашему вниманию подробный отчёт и выводы. На основании проведённой всесторонней полной проверки на верность, мы с уверенностью можем сделать следующий итог: ваша вторая половина не проявляет активности, связанной с онлайн-знакомствами или флиртом, не имеет скрытых или дополнительных аккаунтов в социальных сетях и специальных сервисах и не использует их для ведения двойной личной жизни. Все собранные данные не дают никаких оснований для беспокойства и подтверждают верность вашего партнёра. Мы искренне рады, что результаты проверки оказались положительными. Верьте своей второй половине и дорожите вашими отношениями. Благодарим вас за ваше обращение и доверие. Желаем вам и вашей семье крепкой любви и крепких, доверительных отношений.',
    confidentiality: 'В целях обеспечения максимальной конфиденциальности и полной анонимности наших клиентов данный отчёт передаётся исключительно заказчику и не сохраняется в наших системах в виде копий. После успешной отправки, отчёт автоматически удаляется с сервера отправителя, что исключает его дальнейшее хранение. Мы придерживаемся строгой политики конфиденциальности и гарантируем полную анонимность наших клиентов. Вся информация, связанная с заказом, не сохраняется на наших серверах после его выполнения и не передаётся третьим лицам при любых обстоятельствах. Вся информация, которую мы предоставляем, получена исключительно из общедоступных источников и сервисов, не требующих согласия на обработку персональных данных.'
  });

  const updateReportData = (field: keyof ReportData, value: string) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSection = (section: keyof typeof visibleSections) => {
    setVisibleSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const formatText = (text: string) => {
    if (!text) return text;
    
    return text
      .split('\n')
      .map((paragraph, index) => {
        if (paragraph.trim() === '') return '';
        
        const formatted = paragraph
          .replace(/^\s*-\s*/gm, '• ')
          .replace(/\b(ВАЖНО|Итог|Заключение|Результат|Вывод):/gi, '<strong>$1:</strong>')
          .replace(/\b(\d{1,2}\.\d{1,2}\.\d{4}|\+7\s\d{3}\s\d{3}\s\d{2}\s\d{2})/g, '<strong>$1</strong>')
          .replace(/(vk\.com\/[a-zA-Z0-9_]+|@[a-zA-Z0-9_]+)/g, '<strong>$1</strong>');
        
        return `<p class="mb-3 leading-relaxed">${formatted}</p>`;
      })
      .join('');
  };

  const exportToPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Tabs value={isEditMode ? 'parameters' : 'report'} className="w-full">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={24} className="text-blue-600" />
                  <span className="text-xl font-bold text-slate-800">Верность.Про</span>
                  <Icon name="Heart" size={16} className="text-red-500" />
                </div>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Конфиденциально
                </Badge>
              </div>
              
              <div className="flex items-center space-x-3">
                <TabsList className="grid w-fit grid-cols-2">
                  <TabsTrigger value="report" onClick={() => setIsEditMode(false)}>
                    <Icon name="FileText" size={16} className="mr-2" />
                    Отчёт
                  </TabsTrigger>
                  <TabsTrigger value="parameters" onClick={() => setIsEditMode(true)}>
                    <Icon name="Settings" size={16} className="mr-2" />
                    Параметры
                  </TabsTrigger>
                </TabsList>
                
                <Button onClick={exportToPDF} className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="Download" size={16} className="mr-2" />
                  Готовый отчёт
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Report View */}
        <TabsContent value="report" className="mt-0">
          <div className="max-w-4xl mx-auto p-6 print:p-0 print:max-w-full" ref={reportRef}>
            <div className="bg-white rounded-xl shadow-lg print:shadow-none print:rounded-none">
              {/* Report Header */}
              <div className="p-8 border-b bg-gradient-to-r from-blue-50 to-indigo-50 print:bg-white rounded-t-xl print:rounded-none">
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">
                    Отчёт о проведённой полной проверке на верность
                  </h1>
                  <div className="flex justify-center items-center space-x-6 text-sm text-slate-600">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} />
                      <span>Дата проверки: {reportData.checkDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Hash" size={16} />
                      <span>№ {reportData.checkNumber}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Content */}
              <div className="p-8 space-y-8">
                {/* Customer Info */}
                {visibleSections.customerInfo && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="User" size={20} className="text-blue-600" />
                        <span>Информация о заказчике</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="text-slate-700"
                        dangerouslySetInnerHTML={{ __html: formatText(reportData.customerInfo) }}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* General Info */}
                {visibleSections.generalInfo && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="UserSearch" size={20} className="text-blue-600" />
                        <span>Общая информация о второй половине</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { label: 'ФИО и дата рождения', value: reportData.fullName, icon: 'User' },
                        { label: 'Найденные номера телефонов', value: reportData.phoneNumbers, icon: 'Phone' },
                        { label: 'Найденные E-mail адреса', value: reportData.emails, icon: 'Mail' },
                        { label: 'Найденные документы', value: reportData.documents, icon: 'FileText' },
                        { label: 'Найденные адреса', value: reportData.addresses, icon: 'MapPin' },
                        { label: 'Найденные автомобили', value: reportData.vehicles, icon: 'Car' },
                        { label: 'Найденные аккаунты соцсетей', value: reportData.socialAccounts, icon: 'Users' },
                        { label: 'Как записана у других в телефоне', value: reportData.phoneContacts, icon: 'UserCheck' }
                      ].map((item, index) => (
                        <div key={index} className="border-l-4 border-blue-100 pl-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon name={item.icon as any} size={16} className="text-blue-600" />
                            <Label className="font-semibold text-slate-700">{item.label}</Label>
                          </div>
                          <div 
                            className="text-slate-600 ml-6"
                            dangerouslySetInnerHTML={{ __html: formatText(item.value || 'Информация отсутствует') }}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* VK Analysis */}
                {visibleSections.vkAnalysis && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="Search" size={20} className="text-blue-600" />
                        <span>Полный цифровой анализ основного профиля ВК ({reportData.vkProfileUrl})</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="text-slate-700"
                        dangerouslySetInnerHTML={{ __html: formatText(reportData.vkProfile || 'Мы провели комплексный анализ закрытого профиля ВК, используя передовые поисковые системы, а также специализированные инструменты отслеживания. Целью проверки было выявление признаков активности в группах и сообществах, связанных с тематикой знакомств. По результатам исследования группы, соответствующие тематике знакомств или аналогичным темам, обнаружены не были.') }}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Additional Accounts */}
                {visibleSections.additionalAccounts && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="Users" size={20} className="text-blue-600" />
                        <span>Детальный отчёт о дополнительных аккаунтах</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="text-slate-700"
                        dangerouslySetInnerHTML={{ __html: formatText(reportData.additionalAccounts) }}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Telegram Analysis */}
                {visibleSections.telegramAnalysis && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="MessageSquare" size={20} className="text-blue-600" />
                        <span>Детальный цифровой анализ аккаунта Телеграм ({reportData.telegramUsername})</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="text-slate-700"
                        dangerouslySetInnerHTML={{ __html: formatText(reportData.telegramProfile || 'Был проведён углублённый анализ аккаунта Telegram вашей второй половины, с целью выявления наличия групп и каналов, связанных с тематикой знакомств, флирта и подобных сообществ. По результатам цифрового анализа сообщаем, что на данном аккаунте отсутствуют какие-либо группы или каналы, связанные с тематикой знакомств, флирта и подобной тематике.') }}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Purchase Report */}
                {visibleSections.purchaseReport && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon name="ShoppingCart" size={20} className="text-blue-600" />
                        <span>Подробный отчёт о совершённых покупках</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="text-slate-700"
                        dangerouslySetInnerHTML={{ __html: formatText(reportData.purchaseReport) }}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Conclusion */}
                {visibleSections.conclusion && (
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-green-800">
                        <Icon name="CheckCircle" size={20} className="text-green-600" />
                        <span>Заключение по результатам полной проверки на верность</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="text-green-800"
                        dangerouslySetInnerHTML={{ __html: formatText(reportData.conclusion) }}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Confidentiality */}
                {visibleSections.confidentiality && (
                  <Card className="border-slate-200 bg-slate-50">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-slate-700">
                        <Icon name="Shield" size={20} className="text-slate-600" />
                        <span>Политика конфиденциальности и обеспечения анонимности клиентов</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="text-slate-600"
                        dangerouslySetInnerHTML={{ __html: formatText(reportData.confidentiality) }}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Footer */}
              <footer className="bg-slate-900 text-white p-6 rounded-b-xl print:rounded-none">
                <div className="text-center text-sm">
                  <p className="mb-2">
                    Благодарим Вас за обращение и доверие к нашим услугам. В целях обеспечения анонимности 
                    и защиты конфиденциальных данных все отчёты отправляются исключительно заказчику 
                    и после отправки автоматически удаляются с наших серверов.
                  </p>
                  <p className="text-slate-400">
                    © All Rights Reserved. Proverka.Vernosti 2025
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </TabsContent>

        {/* Parameters View */}
        <TabsContent value="parameters" className="mt-0">
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Настройка параметров отчёта</h2>
                <p className="text-slate-600">
                  Заполните поля для автоматической синхронизации с основным отчётом. 
                  Все изменения сохраняются автоматически.
                </p>
              </div>

              <ScrollArea className="max-h-[calc(100vh-200px)]">
                <div className="p-6 space-y-8">
                  {/* Basic Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Базовая информация</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="checkDate">Дата проверки</Label>
                          <Input
                            id="checkDate"
                            value={reportData.checkDate}
                            onChange={(e) => updateReportData('checkDate', e.target.value)}
                            placeholder="дд.мм.гггг"
                          />
                          <p className="text-xs text-slate-500 mt-1">
                            Автоматически устанавливается текущая дата
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="checkNumber">Номер проверки</Label>
                          <Input
                            id="checkNumber"
                            value={reportData.checkNumber}
                            onChange={(e) => updateReportData('checkNumber', e.target.value)}
                            placeholder="В/П 01442-25"
                          />
                          <p className="text-xs text-slate-500 mt-1">
                            Индивидуальный номер проверки
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Visibility Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Видимость разделов отчёта</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(visibleSections).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <Label className="text-sm">
                            {key === 'customerInfo' && 'Информация о заказчике'}
                            {key === 'generalInfo' && 'Общая информация о второй половине'}
                            {key === 'vkAnalysis' && 'Анализ профиля ВК'}
                            {key === 'additionalAccounts' && 'Дополнительные аккаунты'}
                            {key === 'telegramAnalysis' && 'Анализ Телеграм'}
                            {key === 'purchaseReport' && 'Отчёт о покупках'}
                            {key === 'conclusion' && 'Заключение'}
                            {key === 'confidentiality' && 'Политика конфиденциальности'}
                          </Label>
                          <Switch
                            checked={value}
                            onCheckedChange={() => toggleSection(key as keyof typeof visibleSections)}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Customer Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Информация о заказчике</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Label htmlFor="customerInfo">Контактные данные заказчика</Label>
                      <Textarea
                        id="customerInfo"
                        value={reportData.customerInfo}
                        onChange={(e) => updateReportData('customerInfo', e.target.value)}
                        placeholder="Номер телефона, VK ID, Telegram username"
                        className="mt-2"
                        rows={3}
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Укажите доступную контактную информацию заказчика
                      </p>
                    </CardContent>
                  </Card>

                  {/* General Info Fields */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Общая информация о второй половине</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { key: 'fullName', label: 'ФИО и дата рождения', placeholder: 'Иванов Иван Иванович, 01.01.1990' },
                        { key: 'phoneNumbers', label: 'Найденные номера телефонов', placeholder: '+7 XXX XXX XX XX, +7 YYY YYY YY YY' },
                        { key: 'emails', label: 'Найденные E-mail адреса', placeholder: 'example@mail.ru, example2@gmail.com' },
                        { key: 'documents', label: 'Найденные документы', placeholder: 'Паспорт: серия номер, Права: серия номер' },
                        { key: 'addresses', label: 'Найденные адреса', placeholder: 'г. Москва, ул. Пример, д. 1' },
                        { key: 'vehicles', label: 'Найденные автомобили', placeholder: 'А123БВ777, С456ДЕ78' },
                        { key: 'socialAccounts', label: 'Аккаунты соцсетей и мессенджеров', placeholder: 'VK: vk.com/id123, Instagram: @example' },
                        { key: 'phoneContacts', label: 'Как записана в телефонах', placeholder: 'Маша, Мария, М. Иванова' }
                      ].map((field) => (
                        <div key={field.key}>
                          <Label htmlFor={field.key}>{field.label}</Label>
                          <Textarea
                            id={field.key}
                            value={reportData[field.key as keyof ReportData]}
                            onChange={(e) => updateReportData(field.key as keyof ReportData, e.target.value)}
                            placeholder={field.placeholder}
                            className="mt-2"
                            rows={3}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* VK Profile */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Анализ профиля ВКонтакте</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="vkProfileUrl">Ссылка на профиль ВК</Label>
                        <Input
                          id="vkProfileUrl"
                          value={reportData.vkProfileUrl}
                          onChange={(e) => updateReportData('vkProfileUrl', e.target.value)}
                          placeholder="vk.com/id12345678"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vkProfile">Результаты анализа профиля ВК</Label>
                        <Textarea
                          id="vkProfile"
                          value={reportData.vkProfile}
                          onChange={(e) => updateReportData('vkProfile', e.target.value)}
                          placeholder="Опишите найденную информацию о профиле ВК..."
                          className="mt-2"
                          rows={8}
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Укажите: ссылку на анализ Social Graph Bot, историю изменений, цифровую активность, скрытых друзей
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Telegram Profile */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Анализ аккаунта Телеграм</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="telegramUsername">Username Телеграм</Label>
                        <Input
                          id="telegramUsername"
                          value={reportData.telegramUsername}
                          onChange={(e) => updateReportData('telegramUsername', e.target.value)}
                          placeholder="@username"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="telegramProfile">Результаты анализа Телеграм</Label>
                        <Textarea
                          id="telegramProfile"
                          value={reportData.telegramProfile}
                          onChange={(e) => updateReportData('telegramProfile', e.target.value)}
                          placeholder="Опишите найденную информацию об аккаунте Телеграм..."
                          className="mt-2"
                          rows={8}
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Укажите всю информацию об аккаунте Телеграм, после чего добавьте стандартный шаблонный текст
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Accounts */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Дополнительные аккаунты</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Label htmlFor="additionalAccounts">Отчёт о дополнительных аккаунтах</Label>
                      <Textarea
                        id="additionalAccounts"
                        value={reportData.additionalAccounts}
                        onChange={(e) => updateReportData('additionalAccounts', e.target.value)}
                        className="mt-2"
                        rows={10}
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Стандартный шаблонный текст с возможностью корректировки
                      </p>
                    </CardContent>
                  </Card>

                  {/* Purchase Report */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Отчёт о покупках</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Label htmlFor="purchaseReport">Подробный отчёт о покупках</Label>
                      <Textarea
                        id="purchaseReport"
                        value={reportData.purchaseReport}
                        onChange={(e) => updateReportData('purchaseReport', e.target.value)}
                        className="mt-2"
                        rows={8}
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Нередактируемый шаблонный текст согласно инструкции
                      </p>
                    </CardContent>
                  </Card>

                  {/* Conclusion */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Заключение</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Label htmlFor="conclusion">Заключение по результатам проверки</Label>
                      <Textarea
                        id="conclusion"
                        value={reportData.conclusion}
                        onChange={(e) => updateReportData('conclusion', e.target.value)}
                        className="mt-2"
                        rows={12}
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Готовый шаблонный текст с возможностью редактирования менеджером
                      </p>
                    </CardContent>
                  </Card>

                  {/* Confidentiality */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Политика конфиденциальности</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Label htmlFor="confidentiality">Политика конфиденциальности</Label>
                      <Textarea
                        id="confidentiality"
                        value={reportData.confidentiality}
                        onChange={(e) => updateReportData('confidentiality', e.target.value)}
                        className="mt-2"
                        rows={10}
                        readOnly
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Нередактируемый текст согласно политике компании
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <style jsx>{`
        @media print {
          body { -webkit-print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:bg-white { background-color: white !important; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:max-w-full { max-width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default Index;